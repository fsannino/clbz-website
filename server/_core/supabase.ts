import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { parse as parseCookieHeader } from "cookie";
import type { Request, Response } from "express";
import { ENV } from "./env";

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
