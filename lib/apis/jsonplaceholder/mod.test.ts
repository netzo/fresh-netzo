import "https://deno.land/std@0.198.0/dotenv/load.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { jsonplaceholder } from "./mod.ts";

Deno.test("jsonplaceholder", async (t) => {
  const { api } = jsonplaceholder();

  await t.step("find todos", async () => {
    const data = await api.todos.get();
    assertExists(data);
    assertEquals(Array.isArray(data), true);
  });

  await t.step("get todos", async () => {
    const data = await api.todos["5"].get();
    assertExists(data);
    assertEquals(typeof data, "object");
  });

  await t.step("add todo", async () => {
    const data = await api.todos.post({
      userId: 1,
      title: "New task",
    });
    assertExists(data);
    assertEquals(typeof data, "object");
  });

  await t.step("update todo", async () => {
    const data = await api.todos["1"].put({
      userId: 1,
      title: "Updated task",
      id: 1,
      completed: true,
    });
    assertExists(data);
    assertEquals(typeof data, "object");
  });

  await t.step("delete todo", async () => {
    const data = await api.todos["1"].delete();
    console.log(data);
    assertExists(data);
    assertEquals(typeof data, "object");
  });
});
