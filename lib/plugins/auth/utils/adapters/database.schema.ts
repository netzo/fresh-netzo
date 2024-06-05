// NOTE: the $users and $sessions tables and their relations can be used as
// a reference when vendoring them within projects that use the auth plugin.
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { customAlphabet } from "nanoid";

export const id = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 12);

export const date = () => new Date().toISOString().split("T")[0];
export const datetime = () => new Date().toISOString();

// $users:

export const $users = sqliteTable("$users", {
  id: text("id").primaryKey().$default(() => id()),
  provider: text("provider").notNull(),
  authId: text("authId").notNull(),
  name: text("name"),
  email: text("email"),
  avatar: text("avatar"),
  data: text("data", { mode: "json" }).$default(() => ({
    roles: [],
    status: "active",
  })).$type<{
    roles: ("owner" | "admin" | "developer" | "user" | string)[];
    status: "active" | "inactive";
  }>(),
  createdAt: text("createdAt").notNull().$default(datetime),
  updatedAt: text("updatedAt").notNull().$default(datetime).$onUpdate(datetime),
  deletedAt: text("deletedAt"),
});

export type $User = typeof $users.$inferSelect;
export type $UserData = typeof $users.$inferInsert;

// $sessions:

export const $sessions = sqliteTable("$sessions", {
  id: text("id").primaryKey().$default(() => id()),
  $userId: text("$userId").notNull().references(() => $users.id, { onDelete: "cascade" }),
  createdAt: text("createdAt").notNull().$default(datetime),
});

export type $Session = typeof $sessions.$inferSelect;
export type $SessionData = typeof $sessions.$inferInsert;
