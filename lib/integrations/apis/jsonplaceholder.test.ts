import { assertEquals, assertExists } from "../../deps/std/assert/mod.ts";
import { jsonplaceholder } from "./jsonplaceholder.ts";

Deno.test("[apis] jsonplaceholder", async (t) => {
  const api = jsonplaceholder();

  await t.step("find todos", async () => {
    const resultData = await api.todos.get();
    assertExists(resultData);
    assertEquals(Array.isArray(resultData), true);
  });

  await t.step("get todos", async () => {
    const resultData = await api.todos["5"].get();
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });

  await t.step("add todo", async () => {
    const resultData = await api.todos.post({
      userId: 1,
      title: "New task",
    });
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });

  await t.step("update todo", async () => {
    const resultData = await api.todos["1"].put({
      userId: 1,
      title: "Updated task",
      id: 1,
      completed: true,
    });
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });

  await t.step("delete todo", async () => {
    const resultData = await api.todos["1"].delete();
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });
});
