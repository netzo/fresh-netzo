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
  const resource = CustomResource<Todo>({
    idField: "id",
  });

  await t.step("declarations", () => {
    assertExists(resource);
  });

  await t.step("resource.find()", () => {
    assertThrows(() => resource.find());
  });

  await t.step("resource.get(1)", () => {
    assertThrows(() => resource.get(1));
  });

  await t.step("resource.create()", () => {
    assertThrows(() =>
      resource.create({
        userId: 1,
        title: "lorem ipsum",
        completed: true,
      })
    );
  });

  await t.step("resource.update(1)", () => {
    assertThrows(() =>
      resource.update(1, {
        id: 1,
        userId: 1,
        title: "lorem ipsum",
        completed: true,
      })
    );
  });

  await t.step("resource.patch(1)", () => {
    assertThrows(() =>
      resource.patch(1, {
        title: "lorem ipsum",
      })
    );
  });

  await t.step("resource.delete(1)", () => {
    assertThrows(() => resource.remove(1));
  });
});
