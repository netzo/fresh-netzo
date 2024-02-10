import "../../../deps/std/dotenv/load.ts";
import { assertEquals, assertExists } from "../../../deps/std/assert/mod.ts";
import { z } from "../../../deps/zod/mod.ts";
import { DenoKvResource } from "./denokv.ts";

const kv = await Deno.openKv(":memory:");

const response = await fetch("https://jsonplaceholder.typicode.com/todos");
const todos: Todo[] = await response.json();
await Promise.all(todos.map((todo) => kv.set(["todos", todo.id], todo)));

const todoSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

type Todo = z.infer<typeof todoSchema>;

Deno.test("[api/resources] DenoKvResource", async (t) => {
  const $todos = DenoKvResource({
    kv,
    prefix: ["todos"],
    idField: "id",
  });

  await t.step("declarations", () => {
    assertExists(kv);
    assertExists($todos);
  });

  await t.step("$todos.find()", async () => {
    const todos = await $todos.find<Todo>();
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
