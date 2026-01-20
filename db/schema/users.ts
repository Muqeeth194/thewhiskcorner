import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  number: text("number"),
  instagram: text("instagram"),
  isVerified: integer("isVerified", { mode: "boolean" }).default(false),
  isAdmin: integer("isAdmin", { mode: "boolean" }).default(false),
  forgotPasswordToken: text("forgotPasswordToken"),
  forgotPasswordTokenExpiry: integer("forgotPasswordTokenExpiry", {
    mode: "timestamp",
  }),
  verifyToken: text("verifyToken"),
  verifyTokenExpiry: integer("verifyTokenExpiry", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
})
