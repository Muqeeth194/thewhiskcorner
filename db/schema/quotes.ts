import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const quoteRequests = sqliteTable("quote_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // Contact Info
  name: text("name").notNull(),
  contact: text("contact").notNull(), // Stores phone or email
  instagram: text("instagram"),

  // Cake Details
  type: text("type").notNull(), // Wedding, Birthday, etc.
  flavour: text("flavour"),
  servings: text("servings"),
  budget: text("budget"),
  message: text("message").notNull(),

  // Context (Which cake they were looking at)
  selectedCakeId: text("selected_cake_id"),
  selectedCakeName: text("selected_cake_name"),

  isAttended: integer("is_attended", { mode: "boolean" }).default(false),

  // Metadata
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
})
