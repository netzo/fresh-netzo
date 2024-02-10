import "../../../deps/std/dotenv/load.ts";
import { assertExists, assertThrows } from "../../../deps/std/assert/mod.ts";
import { z } from "../../../deps/zod/mod.ts";
import { Resource } from "./mod.ts";

const todoSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

type Todo = z.infer<typeof todoSchema>;

Deno.test("[api/resources] Resource", async (t) => {
  const $todos = Resource({
    idField: "id",
  });

  await t.step("declarations", () => {
    assertExists($todos);
  });

  await t.step("$todos.find()", () => {
    assertThrows(() => $todos.find<Todo>());
  });

  await t.step("$todos.get(1)", () => {
    assertThrows(() => $todos.get<Todo>(1));
  });

  await t.step("$todos.create()", () => {
    assertThrows(() =>
      $todos.create<Omit<Todo, "id">>({
        userId: 1,
        title: "lorem ipsum",
        completed: true,
      })
    );
  });

  await t.step("$todos.update(1)", () => {
    assertThrows(() =>
      $todos.update<Todo>(1, {
        id: 1,
        userId: 1,
        title: "lorem ipsum",
        completed: true,
      })
    );
  });

  await t.step("$todos.patch(1)", () => {
    assertThrows(() =>
      $todos.patch<Todo>(1, {
        title: "lorem ipsum",
      })
    );
  });

  await t.step("$todos.delete(1)", () => {
    assertThrows(() => $todos.remove<Todo>(1));
  });
});
