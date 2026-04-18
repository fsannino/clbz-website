import { desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { InsertUser, User, users } from "../drizzle/schema";

let _client: ReturnType<typeof postgres> | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _client = postgres(process.env.DATABASE_URL, {
        prepare: false,
        max: 1,
      });
      _db = drizzle(_client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _client = null;
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.supabaseId) {
    throw new Error("User supabaseId is required for upsert");
  }
  if (!user.email) {
    throw new Error("User email is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  const updateSet: Record<string, unknown> = {
    email: user.email,
    lastSignedIn: user.lastSignedIn ?? new Date(),
    updatedAt: new Date(),
  };
  if (user.name !== undefined) updateSet.name = user.name;
  if (user.company !== undefined) updateSet.company = user.company;
  if (user.role !== undefined) updateSet.role = user.role;
  if (user.isActiveClient !== undefined)
    updateSet.isActiveClient = user.isActiveClient;

  await db
    .insert(users)
    .values({
      supabaseId: user.supabaseId,
      email: user.email,
      name: user.name ?? null,
      company: user.company ?? null,
      role: user.role,
      isActiveClient: user.isActiveClient,
      lastSignedIn: user.lastSignedIn ?? new Date(),
    })
    .onConflictDoUpdate({
      target: users.supabaseId,
      set: updateSet,
    });
}

export async function getUserBySupabaseId(supabaseId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(users)
    .where(eq(users.supabaseId, supabaseId))
    .limit(1);
  return result[0];
}

export type ListUsersOptions = {
  role?: User["role"];
  limit?: number;
  offset?: number;
};

export async function listUsers(
  options: ListUsersOptions = {},
): Promise<User[]> {
  const db = await getDb();
  if (!db) return [];
  const limit = options.limit ?? 100;
  const offset = options.offset ?? 0;
  const base = db.select().from(users);
  const filtered = options.role
    ? base.where(eq(users.role, options.role))
    : base;
  return filtered.orderBy(desc(users.createdAt)).limit(limit).offset(offset);
}

export async function updateUserRole(
  supabaseId: string,
  role: User["role"],
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db
    .update(users)
    .set({ role, updatedAt: new Date() })
    .where(eq(users.supabaseId, supabaseId));
}

export async function setUserActiveClient(
  supabaseId: string,
  isActiveClient: boolean,
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db
    .update(users)
    .set({ isActiveClient, updatedAt: new Date() })
    .where(eq(users.supabaseId, supabaseId));
}

export async function deleteUserBySupabaseId(
  supabaseId: string,
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.delete(users).where(eq(users.supabaseId, supabaseId));
}

export async function countUsersByRole(): Promise<
  Record<User["role"], number>
> {
  const db = await getDb();
  const empty: Record<User["role"], number> = {
    pending: 0,
    client: 0,
    active_client: 0,
    admin: 0,
  };
  if (!db) return empty;
  const rows = await db
    .select({
      role: users.role,
      count: sql<number>`count(*)::int`,
    })
    .from(users)
    .groupBy(users.role);
  const out = { ...empty };
  for (const row of rows) {
    out[row.role] = Number(row.count);
  }
  return out;
}
