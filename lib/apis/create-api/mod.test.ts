// TODO: implement tests from https://github.com/johannschopplich/unrested/blob/main/test/index.test.ts
import { assertEquals, assertExists } from "../../deps/std/assert.ts";
import { auth } from "./auth/mod.ts";
import { createApi } from "./mod.ts";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}; // used to test typed results (via generics)

Deno.test("[apis] createApi", async (t) => {
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
    const todos = await api.todos.get<Todo[]>();
    assertEquals(todos?.length, 200);
  });

  await t.step("api.todos[1].get()", async () => {
    const todo = await api.todos[1].get<Todo>();
    assertEquals(todo?.id, 1);
  });

  await t.step("api.todos.post()", async () => {
    const todo = await api.todos.post<Todo>({
      userId: 1,
      title: "lorem ipsum",
      completed: true,
    });
    assertExists(todo);
  });

  await t.step("api.todos[1].put()", async () => {
    const todo = await api.todos[1].put<Todo>({
      userId: 1,
      id: 1,
      title: "lorem ipsum",
      completed: true,
    });
    assertExists(todo);
  });

  await t.step("api.todos[1].patch()", async () => {
    const todo = await api.todos[1].patch<Todo>({ completed: true });
    assertExists(todo);
  });

  await t.step("api.todos[1].delete()", async () => {
    const todo = await api.todos[1].delete<Todo>();
    assertExists(todo);
  });
});
