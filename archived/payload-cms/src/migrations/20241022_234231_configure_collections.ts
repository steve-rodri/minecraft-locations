import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres"
import { sql } from "drizzle-orm"

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

ALTER TABLE "servers" ALTER COLUMN "name" SET NOT NULL;
ALTER TABLE "points" ALTER COLUMN "label" SET NOT NULL;
ALTER TABLE "points" ALTER COLUMN "x" SET NOT NULL;
ALTER TABLE "points" ALTER COLUMN "y" SET NOT NULL;
ALTER TABLE "points" ALTER COLUMN "z" SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "servers_name_idx" ON "servers" USING btree ("name");
CREATE UNIQUE INDEX IF NOT EXISTS "points_label_idx" ON "points" USING btree ("label");`)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DROP INDEX IF EXISTS "servers_name_idx";
DROP INDEX IF EXISTS "points_label_idx";
ALTER TABLE "servers" ALTER COLUMN "name" DROP NOT NULL;
ALTER TABLE "points" ALTER COLUMN "label" DROP NOT NULL;
ALTER TABLE "points" ALTER COLUMN "x" DROP NOT NULL;
ALTER TABLE "points" ALTER COLUMN "y" DROP NOT NULL;
ALTER TABLE "points" ALTER COLUMN "z" DROP NOT NULL;`)
}
