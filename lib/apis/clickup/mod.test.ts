import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.205.0/testing/asserts.ts";
import { clickup } from "./mod.ts";

Deno.test("[apis] clickup", async (t) => {
  const api = clickup({
    personalApiKey: Deno.env.get("CLICKUP_PERSONAL_API_KEY"),
  });

  await t.step("find lists", async () => {
    const result = await api.folder["FOLDER_ID"].list.get();
    assertExists(result.lists);
    assertEquals(Array.isArray(result.lists), true);
  });

  await t.step("get list", async () => {
    const resultData = await api.list["LIST_ID"].get();
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });

  await t.step("find tasks", async () => {
    const result = await api.list["LIST_ID"].task.get();
    assertExists(result.tasks);
    assertEquals(Array.isArray(result.tasks), true);
  });
});
