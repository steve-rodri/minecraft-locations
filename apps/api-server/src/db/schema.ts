import { relations } from "drizzle-orm"
import { integer, pgTable, varchar } from "drizzle-orm/pg-core"
import { timestamps } from "./columns.helpers"

// export const usersTable = pgTable("users", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   email: varchar({ length: 255 }).notNull().unique(),
// })

export const serversTable = pgTable("servers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  ...timestamps,
})

export const serversRelations = relations(serversTable, ({ many }) => ({
  points: many(pointsTable),
}))

export const pointsTable = pgTable("points", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  label: varchar({ length: 255 }).notNull(),
  x: integer().notNull(),
  y: integer().notNull(),
  z: integer().notNull(),
  serverId: integer().notNull(),
  ...timestamps,
})

export const pointsRelations = relations(pointsTable, ({ one }) => ({
  server: one(serversTable, {
    fields: [pointsTable.serverId],
    references: [serversTable.id],
  }),
}))
