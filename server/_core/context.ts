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

  const cookieHeader = opts.req.headers.cookie ?? "";
  const hasSupabaseCookie = /sb-[^=]+-auth-token/.test(cookieHeader);
  console.log(
    `[Auth] createContext: path=${opts.req.path} hasSupabaseCookie=${hasSupabaseCookie} cookieLen=${cookieHeader.length}`,
  );

  try {
    const supabase = createSupabaseServer(opts.req, opts.res);
    const { data, error: authError } = await supabase.auth.getUser();
    const authUser = data?.user ?? null;

    if (authError) {
      console.error(
        `[Auth] supabase.auth.getUser error: ${authError.message} (status=${authError.status})`,
      );
    }
    console.log(
      `[Auth] authUser: id=${authUser?.id ?? "null"} email=${authUser?.email ?? "null"}`,
    );

    if (authUser?.id && authUser.email) {
      let record = await db.getUserBySupabaseId(authUser.id);
      console.log(
        `[Auth] db.getUserBySupabaseId -> ${record ? `found id=${record.id} role=${record.role}` : "undefined"}`,
      );

      if (!record) {
        const initialRole = resolveInitialRole(authUser.email);
        console.log(
          `[Auth] upserting new user email=${authUser.email} role=${initialRole}`,
        );
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
          console.log(
            `[Auth] post-upsert record: ${record ? `id=${record.id}` : "still undefined"}`,
          );
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

  console.log(`[Auth] final ctx.user: ${user ? `id=${user.id}` : "null"}`);

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
