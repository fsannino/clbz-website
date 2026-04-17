import "dotenv/config";
import type { IncomingMessage, ServerResponse } from "node:http";
import { createApiApp } from "../server/_core/app";

// Build the Express app once per cold start; Vercel reuses the instance
// across invocations, giving us a warm connection pool for DB / SDK.
const app = createApiApp();

export default function handler(req: IncomingMessage, res: ServerResponse) {
  return app(req, res);
}
