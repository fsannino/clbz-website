import "dotenv/config";
import { createApiApp } from "../server/_core/app.js";

process.on("unhandledRejection", (reason) => {
  console.error("[process] unhandledRejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("[process] uncaughtException:", err);
});

const app = createApiApp();

export default app;
