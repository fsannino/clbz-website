import { TRPCError } from "@trpc/server";
import { accessRequestRouter } from "./_core/accessRequestRouter.js";
import { adminRouter } from "./_core/adminRouter.js";
import { logAudit } from "./_core/audit.js";
import { contactRouter } from "./_core/contactRouter.js";
import { resourcesRouter } from "./_core/resourcesRouter.js";
import { createSupabaseAdmin, createSupabaseServer } from "./_core/supabase.js";
import { systemRouter } from "./_core/systemRouter.js";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc.js";
import * as db from "./db.js";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  contact: contactRouter,
  accessRequest: accessRequestRouter,
  admin: adminRouter,
  resources: resourcesRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),

    logout: publicProcedure.mutation(async ({ ctx }) => {
      try {
        const supabase = createSupabaseServer(ctx.req, ctx.res);
        await supabase.auth.signOut();
      } catch (error) {
        console.warn("[Auth] signOut failed:", error);
      }
      return { success: true } as const;
    }),

    /**
     * Records that the current user accepted the privacy policy.
     * Called by the signup form right after supabase.auth.signUp.
     */
    recordConsent: protectedProcedure.mutation(async ({ ctx }) => {
      await db.setUserConsent(ctx.user.supabaseId, new Date());
      await logAudit({
        actorId: ctx.user.id,
        action: "consent.accept",
        targetType: "user",
        targetId: ctx.user.id,
        req: ctx.req,
      });
      return { success: true } as const;
    }),

    /**
     * LGPD: returns everything we store about the calling user.
     */
    exportMyData: protectedProcedure.query(async ({ ctx }) => {
      const overrides = await db.listOverridesForUser(ctx.user.id);
      const history = await db.listAuditForUser(ctx.user.id);
      return {
        exportedAt: new Date().toISOString(),
        profile: {
          id: ctx.user.id,
          supabaseId: ctx.user.supabaseId,
          email: ctx.user.email,
          name: ctx.user.name,
          company: ctx.user.company,
          role: ctx.user.role,
          isActiveClient: ctx.user.isActiveClient,
          createdAt: ctx.user.createdAt,
          consentedAt: ctx.user.consentedAt,
        },
        overrides,
        activity: history,
      };
    }),

    /**
     * LGPD: self-service erasure. Removes the user from our DB and
     * from Supabase Auth. After this call the session is dead.
     */
    deleteMyAccount: protectedProcedure.mutation(async ({ ctx }) => {
      if (ctx.user.role === "admin") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Administradores não podem excluir a própria conta pelo portal. Peça a outro administrador.",
        });
      }
      await logAudit({
        actorId: ctx.user.id,
        action: "account.self_delete",
        targetType: "user",
        targetId: ctx.user.id,
        metadata: { email: ctx.user.email },
        req: ctx.req,
      });
      await db.deleteUserById(ctx.user.id);
      const admin = createSupabaseAdmin();
      if (admin) {
        const { error } = await admin.auth.admin.deleteUser(ctx.user.supabaseId);
        if (error) {
          console.warn(
            "[auth.deleteMyAccount] auth.admin.deleteUser failed:",
            error.message,
          );
        }
      }
      try {
        const supabase = createSupabaseServer(ctx.req, ctx.res);
        await supabase.auth.signOut();
      } catch (error) {
        console.warn("[auth.deleteMyAccount] signOut failed:", error);
      }
      return { success: true } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
