import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "../db";
import { createClient } from "@supabase/supabase-js";
import { ENV } from "./env";
import { adminProcedure, router } from "./trpc";

const roleEnum = z.enum(["pending", "client", "active_client", "admin"]);
const supabaseIdSchema = z.string().uuid();

function getAdminClient() {
  if (!ENV.supabaseUrl || !ENV.supabaseServiceRoleKey) return null;
  return createClient(ENV.supabaseUrl, ENV.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

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

      const admin = getAdminClient();
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
