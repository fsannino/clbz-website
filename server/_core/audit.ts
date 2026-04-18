import type { Request } from "express";
import * as db from "../db";

type AuditInput = {
  actorId: number | null;
  action: string;
  targetType?: string;
  targetId?: number | null;
  metadata?: Record<string, unknown>;
  req?: Request;
};

function extractIp(req: Request | undefined): string | null {
  if (!req) return null;
  const fwd = req.headers["x-forwarded-for"];
  const first = Array.isArray(fwd) ? fwd[0] : fwd?.split(",")[0];
  const raw = (first ?? req.ip ?? "").trim();
  return raw ? raw.slice(0, 63) : null;
}

function extractUserAgent(req: Request | undefined): string | null {
  const ua = req?.headers["user-agent"];
  if (!ua) return null;
  return String(ua).slice(0, 400);
}

/**
 * Fire-and-forget audit log entry. Never throws: failures are logged
 * but the originating request still succeeds.
 */
export async function logAudit(input: AuditInput): Promise<void> {
  await db.insertAudit({
    actorId: input.actorId,
    action: input.action,
    targetType: input.targetType ?? null,
    targetId: input.targetId ?? null,
    metadata: (input.metadata as unknown as null | object) ?? null,
    ip: extractIp(input.req),
    userAgent: extractUserAgent(input.req),
  });
}
