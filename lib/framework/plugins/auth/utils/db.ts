import { ulid } from "../../../../database/mod.ts";

const kv = await Deno.openKv();
// TODO: const db = createDatabase(kv);

/**
 * Returns an array of values of a given {@linkcode Deno.KvListIterator} that's
 * been iterated over.
 *
 * @example
 * ```ts
 * import { collectValues, listUsers, type User } from "../../../../framework/plugins/auth/utils/db.ts";
 *
 * const users = await collectValues<User>(listUsers());
 * users[0].id; // Returns "01H9YD2RVCYTBVJEYEJEV5D1S1";
 * users[0].login; // Returns "snoop"
 * users[0].sessionId; // Returns "xxx"
 * users[0].name; // Returns "Snoop Dogg"
 * users[0].email; // Returns "snoop.dogg@example"
 * users[0].role; // Returns "admin"
 * users[0].createdAt; // Returns "2021-08-31T00:00:00.000Z"
 * users[0].updatedAt; // Returns "2021-08-31T00:00:00.000Z"
 * ```
 */
export async function collectValues<T>(iter: Deno.KvListIterator<T>) {
  const values = [];
  for await (const { value } of iter) values.push(value);
  return values;
}

// users:

export type User = {
  id: string;
  login: string; // AKA username
  sessionId: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

/** For testing */
export function randomUser(): User {
  return {
    login: crypto.randomUUID(),
    sessionId: crypto.randomUUID(),
    name: "First Last",
    email: `firs.last@example.com`,
    role: ["admin", "editor", "viewer"][Math.floor(Math.random() * 3)],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Creates a new user in the database. Throws if the user or user session
 * already exists.
 *
 * @example
 * ```ts
 * import { createUser } from "../../../../framework/plugins/auth/utils/db.ts";
 *
 * await createUser({
 *   login: "john",
 *   sessionId: crypto.randomUUID(),
 * });
 * ```
 */
export async function createUser(user: User) {
  user.id = ulid();
  user.createdAt = new Date().toISOString();
  user.updatedAt = user.createdAt;
  const usersKey = ["users", user.login];
  const usersBySessionKey = ["usersBySession", user.sessionId];

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
 * import { updateUser } from "../../../../framework/plugins/auth/utils/db.ts";
 *
 * await updateUser({
 *   login: "john",
 *   sessionId: crypto.randomUUID(),
 *   role: "admin",
 * });
 * ```
 */
export async function updateUser(user: User) {
  user.updatedAt ||= new Date().toISOString();
  const usersKey = ["users", user.login];
  const usersBySessionKey = ["usersBySession", user.sessionId];

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
 * import { updateUserSession } from "../../../../framework/plugins/auth/utils/db.ts";
 *
 * await updateUserSession({
 *   login: "john",
 *   sessionId: "xxx",
 *   role: "admin",
 * }, "yyy");
 * ```
 */
export async function updateUserSession(user: User, sessionId: string) {
  user.updatedAt = new Date().toISOString();
  const userKey = ["users", user.login];
  const oldUserBySessionKey = ["usersBySession", user.sessionId];
  const newUserBySessionKey = ["usersBySession", sessionId];
  const newUser: User = { ...user, sessionId };

  const atomicOp = kv.atomic()
    .set(userKey, newUser)
    .delete(oldUserBySessionKey)
    .check({ key: newUserBySessionKey, versionstamp: null })
    .set(newUserBySessionKey, newUser);

  const res = await atomicOp.commit();
  if (!res.ok) throw new Error("Failed to update user session");
}

/**
 * Gets the user with the given login from the database.
 *
 * @example
 * ```ts
 * import { getUser } from "../../../../framework/plugins/auth/utils/db.ts";
 *
 * const user = await getUser("jack");
 * user?.login; // Returns "jack"
 * user?.sessionId; // Returns "xxx"
 * user?.role; // Returns "admin"
 * ```
 */
export async function getUser(login: string) {
  const res = await kv.get<User>(["users", login]);
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
 * import { getUserBySession } from "../../../../framework/plugins/auth/utils/db.ts";
 *
 * const user = await getUserBySession("xxx");
 * user?.login; // Returns "jack"
 * user?.sessionId; // Returns "xxx"
 * user?.role; // Returns "admin"
 * ```
 */
export async function getUserBySession(sessionId: string) {
  const key = ["usersBySession", sessionId];
  const eventualRes = await kv.get<User>(key, {
    consistency: "eventual",
  });
  if (eventualRes.value !== null) return eventualRes.value;
  const res = await kv.get<User>(key);
  return res.value;
}

/**
 * Returns a {@linkcode Deno.KvListIterator} which can be used to iterate over
 * the users in the database.
 *
 * @example
 * ```ts
 * import { listUsers } from "../../../../framework/plugins/auth/utils/db.ts";
 *
 * for await (const entry of listUsers()) {
 *   entry.value.login; // Returns "jack"
 *   entry.value.sessionId; // Returns "xxx"
 *   entry.value.role; // Returns "admin"
 * }
 * ```
 */
export function listUsers(options?: Deno.KvListOptions) {
  return kv.list<User>({ prefix: ["users"] }, options);
}
