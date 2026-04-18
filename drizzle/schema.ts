import {
  bigint,
  bigserial,
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Access tiers for the client area.
 * - pending: signed up, awaiting admin approval
 * - client: regular client, full portal access
 * - active_client: client currently in operation, can unlock starred resources
 * - admin: full admin panel access
 */
export const userRole = pgEnum("user_role", [
  "pending",
  "client",
  "active_client",
  "admin",
]);

/**
 * Minimum tier required to SEE a resource. "client" means client +
 * active_client + admin can see it; "active_client" narrows it to
 * active_client + admin; "admin" is admin-only.
 */
export const resourceMinTier = pgEnum("resource_min_tier", [
  "client",
  "active_client",
  "admin",
]);

/**
 * One row per Supabase Auth user, keyed by supabaseId (auth.users.id).
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  supabaseId: uuid("supabase_id").notNull().unique(),
  email: varchar("email", { length: 320 }).notNull(),
  name: text("name"),
  company: text("company"),
  role: userRole("role").default("pending").notNull(),
  isActiveClient: boolean("is_active_client").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  lastSignedIn: timestamp("last_signed_in", { withTimezone: true })
    .defaultNow()
    .notNull(),
  consentedAt: timestamp("consented_at", { withTimezone: true }),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 240 }).notNull(),
  description: text("description"),
  categoryId: integer("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  storagePath: text("storage_path"),
  originalFileName: text("original_file_name"),
  mimeType: varchar("mime_type", { length: 160 }),
  sizeBytes: bigint("size_bytes", { mode: "number" }),
  githubUrl: text("github_url"),
  minTier: resourceMinTier("min_tier").default("client").notNull(),
  starredForActive: boolean("starred_for_active").default(false).notNull(),
  createdBy: integer("created_by").references(() => users.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/**
 * Per-user overrides. Lets admins grant or explicitly revoke access
 * to a specific resource for a specific user, outside the tier rules.
 */
export const userResourceOverrides = pgTable(
  "user_resource_overrides",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    resourceId: integer("resource_id")
      .notNull()
      .references(() => resources.id, { onDelete: "cascade" }),
    granted: boolean("granted").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.resourceId] }),
  }),
);

/**
 * Immutable log of important actions (admin changes + every download).
 * Keep at most ~12 months of rows; purge older entries offline.
 */
export const auditLog = pgTable("audit_log", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  actorId: integer("actor_id").references(() => users.id, {
    onDelete: "set null",
  }),
  action: varchar("action", { length: 64 }).notNull(),
  targetType: varchar("target_type", { length: 32 }),
  targetId: integer("target_id"),
  metadata: jsonb("metadata"),
  ip: varchar("ip", { length: 64 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
export type Resource = typeof resources.$inferSelect;
export type InsertResource = typeof resources.$inferInsert;
export type UserResourceOverride = typeof userResourceOverrides.$inferSelect;
export type InsertUserResourceOverride =
  typeof userResourceOverrides.$inferInsert;
export type AuditLog = typeof auditLog.$inferSelect;
export type InsertAuditLog = typeof auditLog.$inferInsert;
