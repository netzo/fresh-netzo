import { assertEquals, assertExists } from "../deps.ts";
import { notion } from "./mod.ts";

Deno.test("notion", async (t) => {
  const { api } = notion({
    internalIntegrationToken: Deno.env.get("NOTION_INTERNAL_INTEGRATION_TOKEN"),
    notionVersion: "2022-06-28",
  });

  await t.step("find pages", async () => {
    const result = await api.databases["DATABASE_ID"].query.post();
    assertExists(result.results);
    assertEquals(Array.isArray(result.results), true);
  });

  await t.step("get page", async () => {
    const data = await api.pages["PAGE_ID"].get();
    assertExists(data);
    assertEquals(typeof data, "object");
  });

  await t.step("get page content", async () => {
    const result = await api.blocks["PAGE_ID"].children.get();
    assertExists(result.results);
    assertEquals(Array.isArray(result.results), true);
  });

  await t.step("find users", async () => {
    const result = await api.users.get();
    assertExists(result.results);
    assertEquals(Array.isArray(result.results), true);
  });
});
