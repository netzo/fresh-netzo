import "../../../deps/std/dotenv/load.ts";
import { assertExists, assertThrows } from "../../../deps/std/assert/mod.ts";
import { z } from "../../../deps/zod/mod.ts";
import { CustomResource } from "./custom.ts";

const todoSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

type Todo = z.infer<typeof todoSchema>;

Deno.test("[api/resources] CustomResource", async (t) => {
  const $todos = CustomResource<Todo>({
    idField: "id",
  });

  await t.step("declarations", () => {
    assertExists($todos);
  });

  await t.step("$todos.find()", () => {
    assertThrows(() => $todos.find());
  });

  await t.step("$todos.get(1)", () => {
    assertThrows(() => $todos.get(1));
  });

  await t.step("$todos.create()", () => {
    assertThrows(() =>
      $todos.create({
        userId: 1,
        title: "lorem ipsum",
        completed: true,
      })
    );
  });

  await t.step("$todos.update(1)", () => {
    assertThrows(() =>
      $todos.update(1, {
        id: 1,
        userId: 1,
        title: "lorem ipsum",
        completed: true,
      })
    );
  });

  await t.step("$todos.patch(1)", () => {
    assertThrows(() =>
      $todos.patch(1, {
        title: "lorem ipsum",
      })
    );
  });

  await t.step("$todos.delete(1)", () => {
    assertThrows(() => $todos.remove(1));
  });
});
