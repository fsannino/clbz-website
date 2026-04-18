import express, { type Express, type NextFunction, type Request, type Response } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { createContext } from "./context";

/**
 * Builds the API-only Express app (tRPC). No Vite middleware,
 * no static file serving. Used by both the local dev server and the
 * Vercel serverless entry (api/index.ts).
 */
export function createApiApp(): Express {
  const app = express();
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ limit: "2mb", extended: true }));

  app.get("/api/health", (_req, res) => {
    res.json({
      ok: true,
      now: new Date().toISOString(),
      node: process.version,
      hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
      hasSupabaseUrl: Boolean(
        process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL,
      ),
      hasSupabaseAnonKey: Boolean(
        process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY,
      ),
      hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    });
  });

  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
      onError({ error, path, type }) {
        console.error(
          `[tRPC] ${type} ${path ?? "<unknown>"} failed:`,
          error,
        );
      },
    }),
  );

  app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
    console.error(`[express] ${req.method} ${req.url} crashed:`, err);
    if (res.headersSent) return;
    res.status(500).json({
      error: "internal_server_error",
      message: err instanceof Error ? err.message : String(err),
    });
  });

  return app;
}
