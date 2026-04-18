import {
  boolean,
  pgEnum,
  pgTable,
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
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
