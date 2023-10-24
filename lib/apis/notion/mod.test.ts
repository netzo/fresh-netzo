import "https://deno.land/std@0.204.0/dotenv/load.ts";
import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.204.0/testing/asserts.ts";
import { notion } from "./mod.ts";

Deno.test("notion", async (t) => {
  const { api } = notion({
    internalIntegrationToken: Deno.env.get(
      "NOTION_INTERNAL_INTEGRATION_TOKEN",
    )!,
    notionVersion: "2022-06-28",
  });

  //IDs required:

  // await t.step("find pages", async () => {
  //   const result = await api.databases["DATABASE_ID"].query.post();
  //   assertExists(result.results);
  //   assertEquals(Array.isArray(result.results), true);
  // });

  // await t.step("get page", async () => {
  //   const resultData = await api.pages["PAGE_ID"].get();
  //   assertExists(resultData);
  //   assertEquals(typeof resultData, "object");
  // });

  // await t.step("get page content", async () => {
  //   const result = await api.blocks["PAGE_ID"].children.get();
  //   assertExists(result.results);
  //   assertEquals(Array.isArray(result.results), true);
  // });

  await t.step("find users", async () => {
    const result = await api.users.get();
    assertExists(result.results);
    assertEquals(Array.isArray(result.results), true);
  });
});
