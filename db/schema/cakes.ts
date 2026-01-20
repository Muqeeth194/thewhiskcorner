import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const cakes = sqliteTable("cakes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  details: text("details").notNull(),
  status: text("status").notNull().default("Active"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
})
