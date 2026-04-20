import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema.js";
import * as db from "../db.js";
import { ENV } from "./env.js";
import { createSupabaseServer } from "./supabase.js";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

function resolveInitialRole(email: string): "admin" | "pending" | "client" {
  const lower = email.toLowerCase();
  if (ENV.adminEmails.includes(lower)) return "admin";
  const domain = lower.split("@")[1];
  if (domain && ENV.autoApproveDomains.includes(domain)) return "client";
  return "pending";
}

export async function createContext(
  opts: CreateExpressContextOptions,
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    const supabase = createSupabaseServer(opts.req, opts.res);
    const { data } = await supabase.auth.getUser();
    const authUser = data?.user ?? null;

    if (authUser?.id && authUser.email) {
      let record = await db.getUserBySupabaseId(authUser.id);

      if (!record) {
        const initialRole = resolveInitialRole(authUser.email);
        try {
          await db.upsertUser({
            supabaseId: authUser.id,
            email: authUser.email,
            name: (authUser.user_metadata?.name as string | undefined) ?? null,
            company:
              (authUser.user_metadata?.company as string | undefined) ?? null,
            role: initialRole,
            lastSignedIn: new Date(),
          });
          record = await db.getUserBySupabaseId(authUser.id);
        } catch (upsertErr) {
          console.error("[Auth] upsertUser failed:", upsertErr);
        }
      } else {
        try {
          await db.upsertUser({
            supabaseId: authUser.id,
            email: authUser.email,
            lastSignedIn: new Date(),
          });
        } catch (upsertErr) {
          console.error("[Auth] refresh upsertUser failed:", upsertErr);
        }
      }

      user = record ?? null;
    }
  } catch (error) {
    console.error("[Auth] Failed to resolve session:", error);
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
