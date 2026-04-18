import { accessRequestRouter } from "./_core/accessRequestRouter";
import { adminRouter } from "./_core/adminRouter";
import { contactRouter } from "./_core/contactRouter";
import { createSupabaseServer } from "./_core/supabase";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  contact: contactRouter,
  accessRequest: accessRequestRouter,
  admin: adminRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(async ({ ctx }) => {
      try {
        const supabase = createSupabaseServer(ctx.req, ctx.res);
        await supabase.auth.signOut();
      } catch (error) {
        console.warn("[Auth] signOut failed:", error);
      }
      return { success: true } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
