import { ulid } from "../../../integrations/databases/netzodb.ts";
import type { AuthProvider } from "./providers/mod.ts";

const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH"));

// users:

export type AuthUser = {
  id: string;
  provider: AuthProvider;
  authId: string; // id from auth provider
  sessionId: string;
  name: string;
  email: string;
  avatar: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: "" | string;
};

export type AuthUserFromProvider = Pick<
  AuthUser,
  "authId" | "name" | "email" | "avatar" | "provider"
>;

/**
 * Creates a new user in the database. Throws if the user or user session
 * already exists.
 *
 * @example
 * ```ts
 * import { createUser } from "../../../../auth/utils/db.ts";
 *
 * await createUser({
 *   authId: "auth0|xxx",
 *   sessionId: crypto.randomUUID(),
 * });
 * ```
 */
export async function createUser(user: AuthUser) {
  user.id = ulid();
  user.createdAt = new Date().toISOString();
  user.updatedAt = user.createdAt;
  user.deletedAt = "";
  const usersKey = ["$users", user.authId];
  const usersBySessionKey = ["$usersBySession", user.sessionId];

  const atomicOp = kv.atomic()
    .check({ key: usersKey, versionstamp: null })
    .check({ key: usersBySessionKey, versionstamp: null })
    .set(usersKey, user)
    .set(usersBySessionKey, user);

  const res = await atomicOp.commit();
  if (!res.ok) throw new Error("Failed to create user");
}

/**
 * Creates a user in the database, overwriting any previous data.
 *
 * @example
 * ```ts
 * import { updateUser } from "../../../../auth/utils/db.ts";
 *
 * await updateUser({
 *   authId: "auth0|xxx",
 *   sessionId: crypto.randomUUID(),
 *   roles: ["admin"],
 * });
 * ```
 */
export async function updateUser(user: AuthUser) {
  user.updatedAt ||= new Date().toISOString();
  const usersKey = ["$users", user.authId];
  const usersBySessionKey = ["$usersBySession", user.sessionId];

  const atomicOp = kv.atomic()
    .set(usersKey, user)
    .set(usersBySessionKey, user);

  const res = await atomicOp.commit();
  if (!res.ok) throw new Error("Failed to update user");
}

/**
 * Updates the session ID of a given user in the database.
 *
 * @example
 * ```ts
 * import { updateUserSession } from "../../../../auth/utils/db.ts";
 *
 * await updateUserSession({
 *   authId: "auth0|xxx",
 *   sessionId: "xxx",
 *   roles: ["admin"],
 * }, "yyy");
 * ```
 */
export async function updateUserSession(user: AuthUser, sessionId: string) {
  user.updatedAt = new Date().toISOString();
  const userKey = ["$users", user.authId];
  const oldUserBySessionKey = ["$usersBySession", user.sessionId];
  const newUserBySessionKey = ["$usersBySession", sessionId];
  const newUser: AuthUser = { ...user, sessionId };

  const atomicOp = kv.atomic()
    .set(userKey, newUser)
    .delete(oldUserBySessionKey)
    .check({ key: newUserBySessionKey, versionstamp: null })
    .set(newUserBySessionKey, newUser);

  const res = await atomicOp.commit();
  if (!res.ok) throw new Error("Failed to update user session");
}

/**
 * Gets the user with the given authId from the database.
 *
 * @example
 * ```ts
 * import { getUser } from "../../../../auth/utils/db.ts";
 *
 * const user = await getUser("jack");
 * user?.authId; // Returns "auth0|xxx"
 * user?.sessionId; // Returns "xxx"
 * user?.roles; // Returns ["admin"]
 * user?.provider; // Returns "github"
 * ```
 */
export async function getUser(authId: string) {
  const res = await kv.get<AuthUser>(["$users", authId]);
  return res.value;
}

/**
 * Gets the user with the given session ID from the database. The first attempt
 * is done with eventual consistency. If that returns `null`, the second
 * attempt is done with strong consistency. This is done for performance
 * reasons, as this function is called in every route request for checking
 * whether the session user is signed in.
 *
 * @example
 * ```ts
 * import { getUserBySession } from "../../../../auth/utils/db.ts";
 *
 * const user = await getUserBySession("xxx");
 * user?.authId; // Returns "auth0|xxx"
 * user?.sessionId; // Returns "xxx"
 * user?.roles; // Returns ["admin"]
 * user?.provider; // Returns "github"
 * ```
 */
export async function getUserBySession(sessionId: string) {
  const key = ["$usersBySession", sessionId];
  const eventualRes = await kv.get<AuthUser>(key, {
    consistency: "eventual",
  });
  if (eventualRes.value !== null) return eventualRes.value;
  const res = await kv.get<AuthUser>(key);
  return res.value;
}

/**
 * Returns a {@linkcode Deno.KvListIterator} which can be used to iterate over
 * the users in the database.
 *
 * @example
 * ```ts
 * import { listUsers } from "../../../../auth/utils/db.ts";
 *
 * for await (const entry of listUsers()) {
 *   entry.value.authId; // Returns "auth0|xxx"
 *   entry.value.sessionId; // Returns "xxx"
 *   entry.value.roles; // Returns ["admin"]
 *   entry.value.provider; // Returns "github"
 * }
 * ```
 */
export function listUsers(options?: Deno.KvListOptions) {
  return kv.list<AuthUser>({ prefix: ["$users"] }, options);
}
