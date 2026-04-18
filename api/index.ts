import "dotenv/config";
import { createApiApp } from "../server/_core/app";

// Stray rejections / throws would otherwise make Vercel kill the
// worker with FUNCTION_INVOCATION_FAILED and no stack trace.
process.on("unhandledRejection", (reason) => {
  console.error("[process] unhandledRejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("[process] uncaughtException:", err);
});

const app = createApiApp();

export default app;
