import "dotenv/config";
import { createApiApp } from "../server/_core/app";

// Build the Express app once per cold start; Vercel's Node runtime
// reuses the instance across invocations. Express apps are valid
// Node request handlers, so exporting it directly works.
const app = createApiApp();

export default app;
