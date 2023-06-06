import { get } from "https://deno.land/x/lodash_es@v0.0.2/mod.ts";
import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { jsonplaceholder } from "./mod.ts";

Deno.test("jsonplaceholder", async (t) => {
  const { api } = jsonplaceholder();

  await t.step("declarations", () => {
    assertExists(jsonplaceholder);
    assertExists(api);
  });

  await t.step("api.todos.get()", async () => {
    const todos = await api.todos.get();
    assertEquals(todos?.length, 200);
  });

  await t.step("api.todos.get({ userId: 1 })", async () => {
    const todos = await api.todos.get({ userId: 1 });
    assertEquals(todos?.length, 20);
  });

  await t.step("api.todos[1].get()", async () => {
    const todo = await api.todos[1].get();
    assertEquals(todo?.id, 1);
  });

  await t.step("api.todos[1].get({ userId: 1 })", async () => {
    const todoQuery = await api.todos[1].get({ userId: 1 });
    assertEquals(todoQuery?.id, 1);
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

  await t.step("lodash.get(api, 'todos').get()", async () => {
    const endpoint = get(api, "todos");
    const todo = await endpoint.get();
    assertExists(todo);
  });

  await t.step("lodash.get(api, 'todos.get')()", async () => {
    const endpointFn = get(api, "todos.get");
    const todo = await endpointFn();
    assertExists(todo);
  });
});
