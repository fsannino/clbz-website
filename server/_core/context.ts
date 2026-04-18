import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import * as db from "../db";
import { ENV } from "./env";
import { createSupabaseServer } from "./supabase";

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
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (authUser?.id && authUser.email) {
      let record = await db.getUserBySupabaseId(authUser.id);

      if (!record) {
        const initialRole = resolveInitialRole(authUser.email);
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
      } else {
        await db.upsertUser({
          supabaseId: authUser.id,
          email: authUser.email,
          lastSignedIn: new Date(),
        });
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
