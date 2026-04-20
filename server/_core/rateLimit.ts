import { TRPCError } from "@trpc/server";
import type { Request } from "express";

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000;

function gc(now: number) {
  if (buckets.size < MAX_BUCKETS) return;
  buckets.forEach((bucket, key) => {
    if (bucket.resetAt <= now) buckets.delete(key);
  });
}

export function clientIp(req: Request | undefined): string {
  if (!req) return "unknown";
  const fwd = req.headers["x-forwarded-for"];
  const first = Array.isArray(fwd) ? fwd[0] : fwd?.split(",")[0];
  return (first ?? req.ip ?? "unknown").trim() || "unknown";
}

export type RateLimitOptions = {
  scope: string;
  max: number;
  windowMs: number;
  key: string;
};

export function enforceRateLimit(opts: RateLimitOptions): void {
  const now = Date.now();
  gc(now);

  const fullKey = `${opts.scope}:${opts.key}`;
  const bucket = buckets.get(fullKey);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(fullKey, { count: 1, resetAt: now + opts.windowMs });
    return;
  }

  if (bucket.count >= opts.max) {
    const retryInSec = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: `Muitas tentativas. Tente novamente em ${retryInSec}s.`,
    });
  }

  bucket.count += 1;
}
