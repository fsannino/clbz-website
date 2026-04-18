import "dotenv/config";
import type { IncomingMessage, ServerResponse } from "node:http";

process.on("unhandledRejection", (reason) => {
  console.error("[process] unhandledRejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("[process] uncaughtException:", err);
});

type ExpressHandler = (req: IncomingMessage, res: ServerResponse) => void;
let cachedApp: ExpressHandler | null = null;
let loadError: Error | null = null;

async function getApp(): Promise<ExpressHandler | null> {
  if (cachedApp) return cachedApp;
  if (loadError) return null;
  try {
    const mod = await import("../server/_core/app");
    cachedApp = mod.createApiApp() as unknown as ExpressHandler;
    return cachedApp;
  } catch (err) {
    loadError = err instanceof Error ? err : new Error(String(err));
    console.error("[api] failed to load Express app:", loadError);
    return null;
  }
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const app = await getApp();
  if (!app) {
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(
      JSON.stringify({
        error: "app_load_failed",
        message: loadError?.message ?? "unknown",
        stack: loadError?.stack?.split("\n").slice(0, 10),
        node: process.version,
      }),
    );
    return;
  }
  try {
    app(req, res);
  } catch (err) {
    console.error("[api] handler threw:", err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("content-type", "application/json");
      res.end(
        JSON.stringify({
          error: "handler_threw",
          message: err instanceof Error ? err.message : String(err),
        }),
      );
    }
  }
}
