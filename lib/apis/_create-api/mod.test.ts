// TODO: implement tests from https://github.com/johannschopplich/uncreate/blob/main/test/index.test.ts
import "https://deno.land/std@0.198.0/dotenv/load.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { createApi } from "./mod.ts";
import { auth } from "./auth/mod.ts";

Deno.test("createApi", async (t) => {
  const api = createApi({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({ type: "none" }, ctx);
    },
  });

  await t.step("declarations", () => {
    assertExists(createApi);
    assertExists(api);
  });

  await t.step("api.todos.get()", async () => {
    const todos = await api.todos.get();
    assertEquals(todos?.length, 200);
  });

  await t.step("api.todos[1].get()", async () => {
    const todo = await api.todos[1].get();
    assertEquals(todo?.id, 1);
  });

  await t.step("api.todos.post()", async () => {
    const todo = await api.todos.post({
      userId: 1,
      title: "lorem ipsum",
      completed: true,
    });
    assertExists(todo);
  });

  await t.step("api.todos[1].put()", async () => {
    const todo = await api.todos[1].put({
      userId: 1,
      id: 1,
      title: "lorem ipsum",
      completed: true,
    });
    assertExists(todo);
  });

  await t.step("api.todos[1].patch()", async () => {
    const todo = await api.todos[1].patch({ completed: true });
    assertExists(todo);
  });

  await t.step("api.todos[1].delete()", async () => {
    const todo = await api.todos[1].delete();
    assertExists(todo);
  });
});
