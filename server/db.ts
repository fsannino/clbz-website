import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  auditLog,
  categories,
  InsertAuditLog,
  InsertCategory,
  InsertResource,
  InsertUser,
  resources,
  User,
  users,
  userResourceOverrides,
} from "../drizzle/schema.js";

let _client: ReturnType<typeof postgres> | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db) {
    if (!process.env.DATABASE_URL) {
      console.error("[Database] DATABASE_URL is not set");
      return null;
    }
    try {
      _client = postgres(process.env.DATABASE_URL, {
        prepare: false,
        max: 1,
        connect_timeout: 5,
        idle_timeout: 10,
        connection: {
          statement_timeout: 8000,
        },
      });
      _db = drizzle(_client);
      console.log("[Database] Connected");
    } catch (error) {
      console.error("[Database] Failed to connect:", error);
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

// ---------- categories ----------

export async function listCategories() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(categories)
    .orderBy(categories.sortOrder, categories.name);
}

export async function createCategory(input: InsertCategory) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const [row] = await db.insert(categories).values(input).returning();
  return row;
}

export async function updateCategory(
  id: number,
  patch: Partial<InsertCategory>,
) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const [row] = await db
    .update(categories)
    .set(patch)
    .where(eq(categories.id, id))
    .returning();
  return row;
}

export async function deleteCategory(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.delete(categories).where(eq(categories.id, id));
}

// ---------- resources ----------

export async function listAllResources() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(resources).orderBy(desc(resources.createdAt));
}

export async function getResourceById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db
    .select()
    .from(resources)
    .where(eq(resources.id, id))
    .limit(1);
  return rows[0];
}

export async function listVisibleResources(user: User) {
  const db = await getDb();
  if (!db) return [];
  const allowedTiers: Array<"client" | "active_client" | "admin"> =
    user.role === "admin"
      ? ["client", "active_client", "admin"]
      : user.role === "active_client"
        ? ["client", "active_client"]
        : user.role === "client"
          ? ["client"]
          : [];

  const base = allowedTiers.length
    ? await db
        .select()
        .from(resources)
        .where(inArray(resources.minTier, allowedTiers))
        .orderBy(desc(resources.createdAt))
    : [];

  const overrides = await db
    .select()
    .from(userResourceOverrides)
    .where(eq(userResourceOverrides.userId, user.id));

  const revokedIds = new Set(
    overrides.filter((o) => !o.granted).map((o) => o.resourceId),
  );
  const grantedIds = overrides
    .filter((o) => o.granted)
    .map((o) => o.resourceId);

  const grantedRows = grantedIds.length
    ? await db
        .select()
        .from(resources)
        .where(inArray(resources.id, grantedIds))
    : [];

  const merged = new Map<number, (typeof base)[number]>();
  for (const row of base) {
    if (!revokedIds.has(row.id)) merged.set(row.id, row);
  }
  for (const row of grantedRows) {
    merged.set(row.id, row);
  }
  return Array.from(merged.values()).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
}

export async function createResource(input: InsertResource) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const [row] = await db.insert(resources).values(input).returning();
  return row;
}

export async function updateResource(
  id: number,
  patch: Partial<InsertResource>,
) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const [row] = await db
    .update(resources)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(resources.id, id))
    .returning();
  return row;
}

export async function deleteResource(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.delete(resources).where(eq(resources.id, id));
}

// ---------- overrides ----------

export async function getOverride(userId: number, resourceId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db
    .select()
    .from(userResourceOverrides)
    .where(
      and(
        eq(userResourceOverrides.userId, userId),
        eq(userResourceOverrides.resourceId, resourceId),
      ),
    )
    .limit(1);
  return rows[0];
}

export async function listOverridesForUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(userResourceOverrides)
    .where(eq(userResourceOverrides.userId, userId));
}

export async function upsertOverride(
  userId: number,
  resourceId: number,
  granted: boolean,
) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db
    .insert(userResourceOverrides)
    .values({ userId, resourceId, granted })
    .onConflictDoUpdate({
      target: [userResourceOverrides.userId, userResourceOverrides.resourceId],
      set: { granted },
    });
}

export async function clearOverride(userId: number, resourceId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db
    .delete(userResourceOverrides)
    .where(
      and(
        eq(userResourceOverrides.userId, userId),
        eq(userResourceOverrides.resourceId, resourceId),
      ),
    );
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return rows[0];
}

// ---------- audit log ----------

export async function insertAudit(entry: InsertAuditLog): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(auditLog).values(entry);
  } catch (error) {
    console.warn("[audit] insert failed:", error);
  }
}

export type ListAuditOptions = {
  limit?: number;
  offset?: number;
  actorId?: number;
  action?: string;
};

export async function listAudit(options: ListAuditOptions = {}) {
  const db = await getDb();
  if (!db) return [];
  const limit = options.limit ?? 200;
  const offset = options.offset ?? 0;

  const filters = [];
  if (options.actorId !== undefined)
    filters.push(eq(auditLog.actorId, options.actorId));
  if (options.action) filters.push(eq(auditLog.action, options.action));

  const base = db.select().from(auditLog);
  const filtered =
    filters.length === 0
      ? base
      : filters.length === 1
        ? base.where(filters[0])
        : base.where(and(...filters));
  return filtered.orderBy(desc(auditLog.createdAt)).limit(limit).offset(offset);
}

export async function listAuditForUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      id: auditLog.id,
      action: auditLog.action,
      targetType: auditLog.targetType,
      targetId: auditLog.targetId,
      createdAt: auditLog.createdAt,
    })
    .from(auditLog)
    .where(eq(auditLog.actorId, userId))
    .orderBy(desc(auditLog.createdAt))
    .limit(500);
}

// ---------- LGPD ----------

export async function deleteUserById(userId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.delete(users).where(eq(users.id, userId));
}

export async function setUserConsent(
  supabaseId: string,
  consentedAt: Date,
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db
    .update(users)
    .set({ consentedAt })
    .where(eq(users.supabaseId, supabaseId));
}

export async function swapCategoryOrder(id: number, direction: "up" | "down") {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const all = await db
    .select()
    .from(categories)
    .orderBy(categories.sortOrder, categories.name);
  const idx = all.findIndex((c) => c.id === id);
  if (idx === -1) return;
  const targetIdx = direction === "up" ? idx - 1 : idx + 1;
  if (targetIdx < 0 || targetIdx >= all.length) return;

  // Normalize to i * 10 so adjacent swaps never collide.
  const order = all.map((c) => c.id);
  [order[idx], order[targetIdx]] = [order[targetIdx], order[idx]];
  await Promise.all(
    order.map((catId, i) =>
      db
        .update(categories)
        .set({ sortOrder: i * 10 })
        .where(eq(categories.id, catId)),
    ),
  );
}
