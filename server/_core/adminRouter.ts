import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "../db";
import { createSupabaseAdmin } from "./supabase";
import { adminProcedure, router } from "./trpc";

const roleEnum = z.enum(["pending", "client", "active_client", "admin"]);
const supabaseIdSchema = z.string().uuid();

export const adminRouter = router({
  listUsers: adminProcedure
    .input(
      z
        .object({
          role: roleEnum.optional(),
          limit: z.number().int().min(1).max(200).optional(),
          offset: z.number().int().min(0).optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => db.listUsers(input ?? {})),

  stats: adminProcedure.query(async () => db.countUsersByRole()),

  updateRole: adminProcedure
    .input(z.object({ supabaseId: supabaseIdSchema, role: roleEnum }))
    .mutation(async ({ input, ctx }) => {
      if (input.supabaseId === ctx.user.supabaseId && input.role !== "admin") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Você não pode remover seu próprio acesso de administrador.",
        });
      }
      await db.updateUserRole(input.supabaseId, input.role);
      return { success: true } as const;
    }),

  setActiveClient: adminProcedure
    .input(
      z.object({
        supabaseId: supabaseIdSchema,
        isActiveClient: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      await db.setUserActiveClient(input.supabaseId, input.isActiveClient);
      return { success: true } as const;
    }),

  listOverrides: adminProcedure
    .input(z.object({ userId: z.number().int().positive() }))
    .query(async ({ input }) => db.listOverridesForUser(input.userId)),

  setOverride: adminProcedure
    .input(
      z.object({
        userId: z.number().int().positive(),
        resourceId: z.number().int().positive(),
        granted: z.boolean().nullable(),
      }),
    )
    .mutation(async ({ input }) => {
      if (input.granted === null) {
        await db.clearOverride(input.userId, input.resourceId);
      } else {
        await db.upsertOverride(input.userId, input.resourceId, input.granted);
      }
      return { success: true } as const;
    }),

  deleteUser: adminProcedure
    .input(z.object({ supabaseId: supabaseIdSchema }))
    .mutation(async ({ input, ctx }) => {
      if (input.supabaseId === ctx.user.supabaseId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Você não pode excluir sua própria conta.",
        });
      }
      await db.deleteUserBySupabaseId(input.supabaseId);

      const admin = createSupabaseAdmin();
      if (admin) {
        const { error } = await admin.auth.admin.deleteUser(input.supabaseId);
        if (error) {
          console.warn(
            "[adminRouter] auth.admin.deleteUser failed:",
            error.message,
          );
        }
      } else {
        console.warn(
          "[adminRouter] SUPABASE_SERVICE_ROLE_KEY not set — auth user kept.",
        );
      }
      return { success: true } as const;
    }),
});
