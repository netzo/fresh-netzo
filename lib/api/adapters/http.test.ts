import "../../deps/std/dotenv/load.ts";
import { assertEquals, assertExists } from "../../deps/std/assert/mod.ts";
import { z } from "../../deps/zod/mod.ts";
import { createApi } from "../../apis/_create-api/mod.ts";
import { HttpService } from "./http.ts";

const todoSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

type Todo = z.infer<typeof todoSchema>;

Deno.test("[api/adapters] HttpService", async (t) => {
  const api = createApi({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: { "content-type": "application/json" },
  });

  const $todos = HttpService({
    client: api.todos,
    idField: "id",
  });

  await t.step("declarations", () => {
    assertExists(api);
    assertExists($todos);
  });

  await t.step("$todos.find()", async () => {
    const todos = await $todos.find();
    assertEquals(todos?.length, 200);
  });

  await t.step("$todos.get(1)", async () => {
    const todo = await $todos.get(1);
    assertEquals(todo?.id, 1);
  });

  await t.step("$todos.create()", async () => {
    const todo = await $todos.create({
      userId: 1,
      title: "lorem ipsum",
      completed: true,
    });
    assertExists(todo);
  });

  await t.step("$todos.update(1)", async () => {
    const todo = await $todos.update(1, {
      id: 1,
      userId: 1,
      title: "lorem ipsum",
      completed: true,
    });
    assertExists(todo);
  });

  await t.step("$todos.patch(1)", async () => {
    const todo = await $todos.patch(1, { completed: true });
    assertExists(todo);
  });

  await t.step("$todos.delete(1)", async () => {
    const todo = await $todos.remove(1);
    assertExists(todo);
  });
});
