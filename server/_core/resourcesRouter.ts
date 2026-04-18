import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import * as db from "../db";
import type { Resource, User } from "../../drizzle/schema";
import { logAudit } from "./audit";
import {
  adminProcedure,
  protectedProcedure,
  publicProcedure,
  router,
} from "./trpc";
import {
  createSupabaseAdmin,
  RESOURCES_BUCKET,
} from "./supabase";

const minTierEnum = z.enum(["client", "active_client", "admin"]);
const MAX_SIZE_BYTES = 200 * 1024 * 1024;
const DOWNLOAD_TTL_SECONDS = 300; // 5 min

function sanitizeFileName(name: string): string {
  const cleaned = name
    .normalize("NFKD")
    .replace(/[^\w.\-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(-180);
  return cleaned.length > 0 ? cleaned : "file";
}

function tierRank(tier: Resource["minTier"]): number {
  return tier === "admin" ? 3 : tier === "active_client" ? 2 : 1;
}

function userRank(user: User): number {
  if (user.role === "admin") return 3;
  if (user.role === "active_client") return 2;
  if (user.role === "client") return 1;
  return 0;
}

async function assertCanDownload(
  user: User,
  resource: Resource,
): Promise<void> {
  if (user.role === "admin") return;
  const override = await db.getOverride(user.id, resource.id);
  if (override?.granted === true) return;
  if (override?.granted === false) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  if (userRank(user) < tierRank(resource.minTier)) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  if (resource.starredForActive && user.role === "client") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message:
        "Este recurso é exclusivo para clientes em operação. Entre em contato para liberar o acesso.",
    });
  }
}

export const resourcesRouter = router({
  // ---------- categories ----------
  listCategories: publicProcedure.query(async () => db.listCategories()),

  createCategory: adminProcedure
    .input(
      z.object({
        name: z.string().trim().min(1).max(160),
        slug: z
          .string()
          .trim()
          .min(1)
          .max(160)
          .regex(/^[a-z0-9-]+$/, "Use apenas letras minúsculas, números e hífens"),
        sortOrder: z.number().int().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const row = await db.createCategory(input);
      await logAudit({
        actorId: ctx.user.id,
        action: "category.create",
        targetType: "category",
        targetId: row?.id,
        metadata: { name: input.name, slug: input.slug },
        req: ctx.req,
      });
      return row;
    }),

  updateCategory: adminProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        name: z.string().trim().min(1).max(160).optional(),
        slug: z
          .string()
          .trim()
          .min(1)
          .max(160)
          .regex(/^[a-z0-9-]+$/)
          .optional(),
        sortOrder: z.number().int().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, ...patch } = input;
      const row = await db.updateCategory(id, patch);
      await logAudit({
        actorId: ctx.user.id,
        action: "category.update",
        targetType: "category",
        targetId: id,
        metadata: patch,
        req: ctx.req,
      });
      return row;
    }),

  deleteCategory: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input, ctx }) => {
      await db.deleteCategory(input.id);
      await logAudit({
        actorId: ctx.user.id,
        action: "category.delete",
        targetType: "category",
        targetId: input.id,
        req: ctx.req,
      });
      return { success: true } as const;
    }),

  moveCategory: adminProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        direction: z.enum(["up", "down"]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await db.swapCategoryOrder(input.id, input.direction);
      await logAudit({
        actorId: ctx.user.id,
        action: "category.move",
        targetType: "category",
        targetId: input.id,
        metadata: { direction: input.direction },
        req: ctx.req,
      });
      return { success: true } as const;
    }),

  // ---------- admin-side resource listing ----------
  listAll: adminProcedure.query(async () => db.listAllResources()),

  // ---------- client portal ----------
  listVisible: protectedProcedure.query(async ({ ctx }) =>
    db.listVisibleResources(ctx.user),
  ),

  // ---------- uploads ----------
  /**
   * Step 1 of upload: admin requests a signed upload URL. The file
   * is uploaded directly from the browser to Supabase Storage.
   */
  requestUpload: adminProcedure
    .input(
      z.object({
        fileName: z.string().trim().min(1).max(240),
        sizeBytes: z.number().int().positive().max(MAX_SIZE_BYTES),
      }),
    )
    .mutation(async ({ input }) => {
      const admin = createSupabaseAdmin();
      if (!admin) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "SUPABASE_SERVICE_ROLE_KEY não configurada.",
        });
      }
      const safeName = sanitizeFileName(input.fileName);
      const path = `${nanoid(24)}/${safeName}`;

      const { data, error } = await admin.storage
        .from(RESOURCES_BUCKET)
        .createSignedUploadUrl(path);

      if (error || !data) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error?.message ?? "Falha ao gerar URL de upload.",
        });
      }

      return {
        path: data.path,
        token: data.token,
        signedUrl: data.signedUrl,
      } as const;
    }),

  /**
   * Step 2: after the browser uploads the file, admin creates the
   * database row describing the resource.
   */
  create: adminProcedure
    .input(
      z.object({
        title: z.string().trim().min(1).max(240),
        description: z.string().trim().max(4000).optional().default(""),
        categoryId: z.number().int().positive().nullable().optional(),
        minTier: minTierEnum,
        starredForActive: z.boolean().default(false),
        storagePath: z.string().trim().min(1).optional(),
        originalFileName: z.string().trim().max(240).optional(),
        mimeType: z.string().trim().max(160).optional(),
        sizeBytes: z.number().int().min(0).optional(),
        githubUrl: z
          .string()
          .trim()
          .url()
          .max(400)
          .optional()
          .or(z.literal("")),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!input.storagePath && !input.githubUrl) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Informe um arquivo (upload) ou um link do GitHub para o recurso.",
        });
      }
      const row = await db.createResource({
        title: input.title,
        description: input.description || null,
        categoryId: input.categoryId ?? null,
        minTier: input.minTier,
        starredForActive: input.starredForActive,
        storagePath: input.storagePath || null,
        originalFileName: input.originalFileName || null,
        mimeType: input.mimeType || null,
        sizeBytes: input.sizeBytes ?? null,
        githubUrl: input.githubUrl || null,
        createdBy: ctx.user.id,
      });
      await logAudit({
        actorId: ctx.user.id,
        action: "resource.create",
        targetType: "resource",
        targetId: row?.id,
        metadata: { title: input.title, minTier: input.minTier },
        req: ctx.req,
      });
      return row;
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        title: z.string().trim().min(1).max(240).optional(),
        description: z.string().trim().max(4000).optional(),
        categoryId: z.number().int().positive().nullable().optional(),
        minTier: minTierEnum.optional(),
        starredForActive: z.boolean().optional(),
        githubUrl: z
          .string()
          .trim()
          .url()
          .max(400)
          .optional()
          .or(z.literal("")),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, ...patch } = input;
      const row = await db.updateResource(id, {
        ...patch,
        description: patch.description ?? undefined,
        githubUrl:
          patch.githubUrl === undefined
            ? undefined
            : patch.githubUrl || null,
      });
      await logAudit({
        actorId: ctx.user.id,
        action: "resource.update",
        targetType: "resource",
        targetId: id,
        metadata: patch,
        req: ctx.req,
      });
      return row;
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input, ctx }) => {
      const resource = await db.getResourceById(input.id);
      if (resource?.storagePath) {
        const admin = createSupabaseAdmin();
        if (admin) {
          const { error } = await admin.storage
            .from(RESOURCES_BUCKET)
            .remove([resource.storagePath]);
          if (error) {
            console.warn("[resources] storage.remove failed:", error.message);
          }
        }
      }
      await db.deleteResource(input.id);
      await logAudit({
        actorId: ctx.user.id,
        action: "resource.delete",
        targetType: "resource",
        targetId: input.id,
        metadata: { title: resource?.title },
        req: ctx.req,
      });
      return { success: true } as const;
    }),

  // ---------- download ----------
  getDownloadUrl: protectedProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input, ctx }) => {
      const resource = await db.getResourceById(input.id);
      if (!resource) throw new TRPCError({ code: "NOT_FOUND" });
      await assertCanDownload(ctx.user, resource);

      if (resource.githubUrl && !resource.storagePath) {
        await logAudit({
          actorId: ctx.user.id,
          action: "resource.download",
          targetType: "resource",
          targetId: resource.id,
          metadata: { title: resource.title, kind: "github" },
          req: ctx.req,
        });
        return {
          url: resource.githubUrl,
          kind: "github" as const,
          fileName: resource.originalFileName ?? resource.title,
        };
      }

      if (!resource.storagePath) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Este recurso não possui arquivo anexado.",
        });
      }

      const admin = createSupabaseAdmin();
      if (!admin) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "SUPABASE_SERVICE_ROLE_KEY não configurada.",
        });
      }
      const { data, error } = await admin.storage
        .from(RESOURCES_BUCKET)
        .createSignedUrl(resource.storagePath, DOWNLOAD_TTL_SECONDS, {
          download: resource.originalFileName ?? undefined,
        });
      if (error || !data) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error?.message ?? "Falha ao gerar URL de download.",
        });
      }
      await logAudit({
        actorId: ctx.user.id,
        action: "resource.download",
        targetType: "resource",
        targetId: resource.id,
        metadata: { title: resource.title, fileName: resource.originalFileName },
        req: ctx.req,
      });
      return {
        url: data.signedUrl,
        kind: "storage" as const,
        fileName: resource.originalFileName ?? resource.title,
      };
    }),
});
