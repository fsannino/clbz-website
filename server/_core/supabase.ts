import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { parse as parseCookieHeader } from "cookie";
import type { Request, Response } from "express";
import { ENV } from "./env.js";

/**
 * Builds a Supabase server client bound to the current Express request/response
 * cookies, so Supabase can read/refresh the session automatically.
 * Uses the publishable/anon key — RLS applies.
 */
export function createSupabaseServer(req: Request, res: Response) {
  const parsed = parseCookieHeader(req.headers.cookie ?? "");

  return createServerClient(ENV.supabaseUrl, ENV.supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return parsed[name];
      },
      set(name: string, value: string, options: CookieOptions) {
        res.cookie(name, value, {
          ...options,
          sameSite: options.sameSite as "lax" | "strict" | "none" | undefined,
        });
      },
      remove(name: string, options: CookieOptions) {
        res.clearCookie(name, {
          ...options,
          sameSite: options.sameSite as "lax" | "strict" | "none" | undefined,
        });
      },
    },
  });
}

let _admin: SupabaseClient | null = null;

/**
 * Server-only Supabase client authenticated with the service-role key.
 * Bypasses RLS — never expose to the browser. Returns null if the
 * service key is not configured (features that depend on it must
 * degrade gracefully).
 */
export function createSupabaseAdmin(): SupabaseClient | null {
  if (!ENV.supabaseUrl || !ENV.supabaseServiceRoleKey) return null;
  if (!_admin) {
    _admin = createClient(ENV.supabaseUrl, ENV.supabaseServiceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _admin;
}

export const RESOURCES_BUCKET = "resources";

