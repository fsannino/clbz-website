CREATE TYPE "public"."user_role" AS ENUM('pending', 'client', 'active_client', 'admin');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"supabase_id" uuid NOT NULL,
	"email" varchar(320) NOT NULL,
	"name" text,
	"company" text,
	"role" "user_role" DEFAULT 'pending' NOT NULL,
	"is_active_client" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_signed_in" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_supabase_id_unique" UNIQUE("supabase_id")
);
