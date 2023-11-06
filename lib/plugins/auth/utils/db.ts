import { ulid } from "../../../db/mod.ts";

const kv = await Deno.openKv();
// TODO: const db = createDatabase(kv);

/**
 * Returns an array of values of a given {@linkcode Deno.KvListIterator} that's
 * been iterated over.
 *
 * @example
 * ```ts
 * import { collectValues, listItems, type Item } from "netzo/plugins/auth/utils/db.ts";
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

// Item
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
 * import { createItem } from "netzo/plugins/auth/utils/db.ts";
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
 * import { getItem } from "netzo/plugins/auth/utils/db.ts";
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
 * import { listItems } from "netzo/plugins/auth/utils/db.ts";
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
 * import { listItemsByUser } from "netzo/plugins/auth/utils/db.ts";
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

// Vote
export type Vote = {
  itemId: string;
  userLogin: string;
};

/**
 * Creates a vote in the database. Throws if the given item or user doesn't
 * exist or the vote already exists. The item's score is incremented by 1.
 *
 * @example
 * ```ts
 * import { createVote } from "netzo/plugins/auth/utils/db.ts";
 *
 * await createVote({
 *   itemId: "01H9YD2RVCYTBVJEYEJEV5D1S1",
 *   userLogin: "pedro",
 * });
 * ```
 */
export async function createVote(vote: Vote) {
  const itemKey = ["items", vote.itemId];
  const userKey = ["auth", "users", vote.userLogin];
  const [itemRes, userRes] = await kv.getMany<[Item, User]>([itemKey, userKey]);
  const item = itemRes.value;
  const user = userRes.value;
  if (item === null) throw new Deno.errors.NotFound("Item not found");
  if (user === null) throw new Deno.errors.NotFound("User not found");

  const itemVotedByUserKey = [
    "items_voted_by_user",
    vote.userLogin,
    vote.itemId,
  ];
  const userVotedForItemKey = [
    "users_voted_for_item",
    vote.itemId,
    vote.userLogin,
  ];
  const itemByUserKey = ["items_by_user", item.userLogin, item.id];

  item.score++;

  const res = await kv.atomic()
    .check(itemRes)
    .check(userRes)
    .check({ key: itemVotedByUserKey, versionstamp: null })
    .check({ key: userVotedForItemKey, versionstamp: null })
    .set(itemKey, item)
    .set(itemByUserKey, item)
    .set(itemVotedByUserKey, item)
    .set(userVotedForItemKey, user)
    .commit();

  if (!res.ok) throw new Error("Failed to create vote");
}

/**
 * Returns a {@linkcode Deno.KvListIterator} which can be used to iterate over
 * the items voted by a given user in the database, in chronological order.
 *
 * @example
 * ```ts
 * import { listItemsVotedByUser } from "netzo/plugins/auth/utils/db.ts";
 *
 * for await (const entry of listItemsVotedByUser("john")) {
 *   entry.value.id; // Returns "01H9YD2RVCYTBVJEYEJEV5D1S1"
 *   entry.value.userLogin; // Returns "pedro"
 *   entry.key; // Returns ["items_voted_by_user", "01H9YD2RVCYTBVJEYEJEV5D1S1", "pedro"]
 *   entry.versionstamp; // Returns "00000000000000010000"
 * }
 * ```
 */
export function listItemsVotedByUser(userLogin: string) {
  return kv.list<Item>({ prefix: ["items_voted_by_user", userLogin] });
}

// User
export type User = {
  login: string; // AKA username
  sessionId: string;
  role: string;
};

/** For testing */
export function randomUser(): User {
  return {
    login: crypto.randomUUID(),
    sessionId: crypto.randomUUID(),
    role: ["admin", "editor", "viewer"][Math.floor(Math.random() * 3)],
  };
}

/**
 * Creates a new user in the database. Throws if the user or user session
 * already exists.
 *
 * @example
 * ```ts
 * import { createUser } from "netzo/plugins/auth/utils/db.ts";
 *
 * await createUser({
 *   login: "john",
 *   sessionId: crypto.randomUUID(),
 * });
 * ```
 */
export async function createUser(user: User) {
  const usersKey = ["auth", "users", user.login];
  const usersBySessionKey = ["auth", "usersBySession", user.sessionId];

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
 * import { updateUser } from "netzo/plugins/auth/utils/db.ts";
 *
 * await updateUser({
 *   login: "john",
 *   sessionId: crypto.randomUUID(),
 *   role: "admin",
 * });
 * ```
 */
export async function updateUser(user: User) {
  const usersKey = ["auth", "users", user.login];
  const usersBySessionKey = ["auth", "usersBySession", user.sessionId];

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
 * import { updateUserSession } from "netzo/plugins/auth/utils/db.ts";
 *
 * await updateUserSession({
 *   login: "john",
 *   sessionId: "xxx",
 *   role: "admin",
 * }, "yyy");
 * ```
 */
export async function updateUserSession(user: User, sessionId: string) {
  const userKey = ["auth", "users", user.login];
  const oldUserBySessionKey = ["auth", "usersBySession", user.sessionId];
  const newUserBySessionKey = ["auth", "usersBySession", sessionId];
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
 * import { getUser } from "netzo/plugins/auth/utils/db.ts";
 *
 * const user = await getUser("jack");
 * user?.login; // Returns "jack"
 * user?.sessionId; // Returns "xxx"
 * user?.role; // Returns "admin"
 * ```
 */
export async function getUser(login: string) {
  const res = await kv.get<User>(["auth", "users", login]);
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
 * import { getUserBySession } from "netzo/plugins/auth/utils/db.ts";
 *
 * const user = await getUserBySession("xxx");
 * user?.login; // Returns "jack"
 * user?.sessionId; // Returns "xxx"
 * user?.role; // Returns "admin"
 * ```
 */
export async function getUserBySession(sessionId: string) {
  const key = ["auth", "usersBySession", sessionId];
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
 * import { listUsers } from "netzo/plugins/auth/utils/db.ts";
 *
 * for await (const entry of listUsers()) {
 *   entry.value.login; // Returns "jack"
 *   entry.value.sessionId; // Returns "xxx"
 *   entry.value.role; // Returns "admin"
 * }
 * ```
 */
export function listUsers(options?: Deno.KvListOptions) {
  return kv.list<User>({ prefix: ["auth", "users"] }, options);
}

/**
 * Returns a boolean array indicating whether the given items have been voted
 * for by the given user in the database.
 *
 * @example
 * ```ts
 * import { getAreVotedByUser } from "netzo/plugins/auth/utils/db.ts";
 *
 * const items = [
 *   {
 *     id: "01H9YD2RVCYTBVJEYEJEV5D1S1",
 *     userLogin: "jack",
 *     title: "Jack voted for this",
 *     url: "http://example.com",
 *     score: 1,
 *   },
 *   {
 *     id: "01H9YD2RVCYTBVJEYEJEV5D1S2",
 *     userLogin: "jill",
 *     title: "Jack didn't vote for this",
 *     url: "http://youtube.com",
 *     score: 0,
 *   }
 * ];
 * await getAreVotedByUser(items, "jack"); // Returns [true, false]
 * ```
 */
export async function getAreVotedByUser(items: Item[], userLogin: string) {
  const votedItems = await collectValues(listItemsVotedByUser(userLogin));
  const votedItemsIds = votedItems.map((item) => item.id);
  return items.map((item) => votedItemsIds.includes(item.id));
}
