import { ulid } from "../../../database/mod.ts";

const kv = await Deno.openKv();
// TODO: const db = createDatabase(kv);

/**
 * Returns an array of values of a given {@linkcode Deno.KvListIterator} that's
 * been iterated over.
 *
 * @example
 * ```ts
 * import { collectValues, listItems, type Item } from "netzo/plugins/portal/utils/db.ts";
 *
 * const items = await collectValues<Item>(listItems());
 * items[0].id; // Returns "01H9YD2RVCYTBVJEYEJEV5D1S1";
 * items[0].userLogin; // Returns "snoop"
 * items[0].title; // Returns "example-title"
 * items[0].url; // Returns "http://example.com"
 * items[0].score; // Returns 420
 * ```
 */
export async function collectValues<T>(iter: Deno.KvListIterator<T>) {
  const values = [];
  for await (const { value } of iter) values.push(value);
  return values;
}

// items:

export type Item = {
  // Uses ULID
  id: string;
  userLogin: string;
  title: string;
  url: string;
  score: number;
};

/** For testing */
export function randomItem(): Item {
  return {
    id: ulid(),
    userLogin: crypto.randomUUID(),
    title: crypto.randomUUID(),
    url: `http://${crypto.randomUUID()}.com`,
    score: 0,
  };
}

/**
 * Creates a new item in the database. Throws if the item already exists in
 * one of the indexes.
 *
 * @example
 * ```ts
 * import { createItem } from "netzo/plugins/portal/utils/db.ts";
 * import { ulid } from "std/ulid/mod.ts";
 *
 * await createItem({
 *   id: ulid(),
 *   userLogin: "john_doe",
 *   title: "example-title",
 *   url: "https://example.com",
 *   score: 0,
 * });
 * ```
 */
export async function createItem(item: Item) {
  const itemsKey = ["items", item.id];
  const itemsByUserKey = ["items_by_user", item.userLogin, item.id];

  const res = await kv.atomic()
    .check({ key: itemsKey, versionstamp: null })
    .check({ key: itemsByUserKey, versionstamp: null })
    .set(itemsKey, item)
    .set(itemsByUserKey, item)
    .commit();

  if (!res.ok) throw new Error("Failed to create item");
}

/**
 * Gets the item with the given ID from the database.
 *
 * @example
 * ```ts
 * import { getItem } from "netzo/plugins/portal/utils/db.ts";
 *
 * const item = await getItem("01H9YD2RVCYTBVJEYEJEV5D1S1");
 * item?.id; // Returns "01H9YD2RVCYTBVJEYEJEV5D1S1";
 * item?.userLogin; // Returns "snoop"
 * item?.title; // Returns "example-title"
 * item?.url; // Returns "http://example.com"
 * item?.score; // Returns 420
 * ```
 */
export async function getItem(id: string) {
  const res = await kv.get<Item>(["items", id]);
  return res.value;
}

/**
 * Returns a {@linkcode Deno.KvListIterator} which can be used to iterate over
 * the items in the database, in chronological order.
 *
 * @example
 * ```ts
 * import { listItems } from "netzo/plugins/portal/utils/db.ts";
 *
 * for await (const entry of listItems()) {
 *   entry.value.id; // Returns "01H9YD2RVCYTBVJEYEJEV5D1S1"
 *   entry.value.userLogin; // Returns "pedro"
 *   entry.key; // Returns ["items_voted_by_user", "01H9YD2RVCYTBVJEYEJEV5D1S1", "pedro"]
 *   entry.versionstamp; // Returns "00000000000000010000"
 * }
 * ```
 */
export function listItems(options?: Deno.KvListOptions) {
  return kv.list<Item>({ prefix: ["items"] }, options);
}

/**
 * Returns a {@linkcode Deno.KvListIterator} which can be used to iterate over
 * the items by a given user in the database, in chronological order.
 *
 * @example
 * ```ts
 * import { listItemsByUser } from "netzo/plugins/portal/utils/db.ts";
 *
 * for await (const entry of listItemsByUser("pedro")) {
 *   entry.value.id; // Returns "01H9YD2RVCYTBVJEYEJEV5D1S1"
 *   entry.value.userLogin; // Returns "pedro"
 *   entry.key; // Returns ["items_voted_by_user", "01H9YD2RVCYTBVJEYEJEV5D1S1", "pedro"]
 *   entry.versionstamp; // Returns "00000000000000010000"
 * }
 * ```
 */
export function listItemsByUser(
  userLogin: string,
  options?: Deno.KvListOptions,
) {
  return kv.list<Item>({ prefix: ["items_by_user", userLogin] }, options);
}

// users:

export type User = {
  id: string;
  login: string; // AKA username
  sessionId: string;
  name: string;
  email: string;
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
 * import { createUser } from "netzo/plugins/portal/utils/db.ts";
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
  const usersKey = ["portal", "users", user.login];
  const usersBySessionKey = ["portal", "usersBySession", user.sessionId];

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
 * import { updateUser } from "netzo/plugins/portal/utils/db.ts";
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
  const usersKey = ["portal", "users", user.login];
  const usersBySessionKey = ["portal", "usersBySession", user.sessionId];

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
 * import { updateUserSession } from "netzo/plugins/portal/utils/db.ts";
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
  const userKey = ["portal", "users", user.login];
  const oldUserBySessionKey = ["portal", "usersBySession", user.sessionId];
  const newUserBySessionKey = ["portal", "usersBySession", sessionId];
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
 * import { getUser } from "netzo/plugins/portal/utils/db.ts";
 *
 * const user = await getUser("jack");
 * user?.login; // Returns "jack"
 * user?.sessionId; // Returns "xxx"
 * user?.role; // Returns "admin"
 * ```
 */
export async function getUser(login: string) {
  const res = await kv.get<User>(["portal", "users", login]);
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
 * import { getUserBySession } from "netzo/plugins/portal/utils/db.ts";
 *
 * const user = await getUserBySession("xxx");
 * user?.login; // Returns "jack"
 * user?.sessionId; // Returns "xxx"
 * user?.role; // Returns "admin"
 * ```
 */
export async function getUserBySession(sessionId: string) {
  const key = ["portal", "usersBySession", sessionId];
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
 * import { listUsers } from "netzo/plugins/portal/utils/db.ts";
 *
 * for await (const entry of listUsers()) {
 *   entry.value.login; // Returns "jack"
 *   entry.value.sessionId; // Returns "xxx"
 *   entry.value.role; // Returns "admin"
 * }
 * ```
 */
export function listUsers(options?: Deno.KvListOptions) {
  return kv.list<User>({ prefix: ["portal", "users"] }, options);
}
