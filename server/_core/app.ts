import express, { type Express } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { registerOAuthRoutes } from "./oauth";

/**
 * Builds the API-only Express app (tRPC + OAuth). No Vite middleware,
 * no static file serving. Used by both the local dev server and the
 * Vercel serverless entry (api/index.ts).
 */
export function createApiApp(): Express {
  const app = express();
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ limit: "2mb", extended: true }));

  registerOAuthRoutes(app);

  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  return app;
}
