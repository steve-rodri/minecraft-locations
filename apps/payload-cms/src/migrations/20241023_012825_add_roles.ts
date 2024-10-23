import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "public"."enum_users_roles" AS ENUM('admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users_roles" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_users_roles",
	"id" serial PRIMARY KEY NOT NULL
);

ALTER TABLE "points" RENAME TO "locations";
ALTER TABLE "points_rels" RENAME TO "locations_rels";
ALTER TABLE "locations_rels" DROP CONSTRAINT "points_rels_parent_fk";

ALTER TABLE "locations_rels" DROP CONSTRAINT "points_rels_servers_fk";

DROP INDEX IF EXISTS "points_label_idx";
DROP INDEX IF EXISTS "points_created_at_idx";
DROP INDEX IF EXISTS "points_rels_order_idx";
DROP INDEX IF EXISTS "points_rels_parent_idx";
DROP INDEX IF EXISTS "points_rels_path_idx";
DROP INDEX IF EXISTS "points_rels_servers_id_idx";
DO $$ BEGIN
 ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "users_roles_order_idx" ON "users_roles" USING btree ("order");
CREATE INDEX IF NOT EXISTS "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
DO $$ BEGIN
 ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_servers_fk" FOREIGN KEY ("servers_id") REFERENCES "public"."servers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "locations_label_idx" ON "locations" USING btree ("label");
CREATE INDEX IF NOT EXISTS "locations_created_at_idx" ON "locations" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "locations_rels_order_idx" ON "locations_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "locations_rels_parent_idx" ON "locations_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "locations_rels_path_idx" ON "locations_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "locations_rels_servers_id_idx" ON "locations_rels" USING btree ("servers_id");`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "users_roles";
ALTER TABLE "locations" RENAME TO "points";
ALTER TABLE "locations_rels" RENAME TO "points_rels";
ALTER TABLE "points_rels" DROP CONSTRAINT "locations_rels_parent_fk";

ALTER TABLE "points_rels" DROP CONSTRAINT "locations_rels_servers_fk";

DROP INDEX IF EXISTS "locations_label_idx";
DROP INDEX IF EXISTS "locations_created_at_idx";
DROP INDEX IF EXISTS "locations_rels_order_idx";
DROP INDEX IF EXISTS "locations_rels_parent_idx";
DROP INDEX IF EXISTS "locations_rels_path_idx";
DROP INDEX IF EXISTS "locations_rels_servers_id_idx";
DO $$ BEGIN
 ALTER TABLE "points_rels" ADD CONSTRAINT "points_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."points"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "points_rels" ADD CONSTRAINT "points_rels_servers_fk" FOREIGN KEY ("servers_id") REFERENCES "public"."servers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "points_label_idx" ON "points" USING btree ("label");
CREATE INDEX IF NOT EXISTS "points_created_at_idx" ON "points" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "points_rels_order_idx" ON "points_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "points_rels_parent_idx" ON "points_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "points_rels_path_idx" ON "points_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "points_rels_servers_id_idx" ON "points_rels" USING btree ("servers_id");`);

};
