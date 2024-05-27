// NOTE: the $users and $sessions tables and their relations can be used as
// a reference when vendoring them within projects that use the auth plugin.
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { customAlphabet } from "nanoid";

export const id = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 12);

// $users:

export const $users = sqliteTable("$users", {
  id: text("id").primaryKey().$default(() => id()),
  provider: text("provider").notNull(),
  authId: text("authId").notNull(),
  name: text("name"),
  email: text("email"),
  avatar: text("avatar"),
  projects: text("projects", { mode: "json" }).$default(() => ({})).$type<{
    roles: ("owner" | "admin" | "developer" | "user" | string)[];
    // deno-lint-ignore no-explicit-any
    [k: string]: any;
  }>(),
  data: text("data", { mode: "json" }).$default(() => ({
    status: text("status"),
    position: text("position"),
    phone: text("phone"),
  })).$type<{
    status: string;
    position: string;
    phone: string;
  }>(),
  createdAt: text("createdAt").notNull().$default(() =>
    new Date().toISOString()
  ),
  updatedAt: text("updatedAt").notNull().$default(() =>
    new Date().toISOString()
  ).$onUpdate(() => new Date().toISOString()),
  deletedAt: text("deletedAt"),
});

export type $User = typeof $users.$inferSelect;
export type $UserData = typeof $users.$inferInsert;

// $sessions:

export const $sessions = sqliteTable("$sessions", {
  id: text("id").primaryKey().$default(() => id()),
  $userId: text("$userId").notNull().references(() => $users.id),
  createdAt: text("createdAt").notNull().$default(() =>
    new Date().toISOString()
  ),
});

export type $Session = typeof $sessions.$inferSelect;
export type $SessionData = typeof $sessions.$inferInsert;
