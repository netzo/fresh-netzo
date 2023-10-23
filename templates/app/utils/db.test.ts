// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { assertEquals, assertRejects } from "std/assert/mod.ts";
import { ulid } from "std/ulid/mod.ts";
import {
  collectValues,
  createItem,
  createUser,
  createVote,
  getItem,
  getUser,
  getUserBySession,
  type Item,
  listItems,
  listItemsByUser,
  listItemsVotedByUser,
  randomItem,
  randomUser,
  updateUser,
  updateUserSession,
  type User,
} from "./db.ts";

Deno.test("[auth/db] items", async () => {
  const user = randomUser();
  const item1: Item = {
    ...randomItem(),
    id: ulid(),
    userLogin: user.username,
  };
  const item2: Item = {
    ...randomItem(),
    id: ulid(Date.now() + 1_000),
    userLogin: user.username,
  };

  assertEquals(await getItem(item1.id), null);
  assertEquals(await getItem(item2.id), null);
  assertEquals(await collectValues(listItems()), []);
  assertEquals(await collectValues(listItemsByUser(user.username)), []);

  await createItem(item1);
  await createItem(item2);
  await assertRejects(async () => await createItem(item1));

  assertEquals(await getItem(item1.id), item1);
  assertEquals(await getItem(item2.id), item2);
  assertEquals(await collectValues(listItems()), [item1, item2]);
  assertEquals(await collectValues(listItemsByUser(user.username)), [
    item1,
    item2,
  ]);
});

Deno.test("[auth/db] user", async () => {
  const user = randomUser();

  assertEquals(await getUser(user.username), null);
  assertEquals(await getUserBySession(user.sessionId), null);

  await createUser(user);
  await assertRejects(async () => await createUser(user));
  assertEquals(await getUser(user.username), user);
  assertEquals(await getUserBySession(user.sessionId), user);

  const subscribedUser: User = { ...user, role: "admin" };
  await updateUser(subscribedUser);
  assertEquals(await getUser(subscribedUser.username), subscribedUser);
  assertEquals(
    await getUserBySession(subscribedUser.sessionId),
    subscribedUser,
  );

  const newSessionId = crypto.randomUUID();
  await updateUserSession(user, newSessionId);
  assertEquals(await getUserBySession(user.sessionId), null);
  assertEquals(await getUserBySession(newSessionId), {
    ...user,
    sessionId: newSessionId,
  });

  await assertRejects(
    async () => await updateUserSession(user, newSessionId),
    Error,
    "Failed to update user session",
  );
});

Deno.test("[auth/db] votes", async () => {
  const item = randomItem();
  const user = randomUser();
  const vote = {
    itemId: item.id,
    userLogin: user.username,
    createdAt: new Date(),
  };

  assertEquals(await collectValues(listItemsVotedByUser(user.username)), []);

  await assertRejects(
    async () => await createVote(vote),
    Deno.errors.NotFound,
    "Item not found",
  );
  await createItem(item);
  await assertRejects(
    async () => await createVote(vote),
    Deno.errors.NotFound,
    "User not found",
  );
  await createUser(user);
  await createVote(vote);
  item.score++;

  assertEquals(await collectValues(listItemsVotedByUser(user.username)), [
    item,
  ]);
  await assertRejects(async () => await createVote(vote));
});
