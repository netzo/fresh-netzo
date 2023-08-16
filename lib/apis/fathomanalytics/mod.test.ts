import { assertEquals, assertExists } from "../deps.ts";
import { fathomanalytics } from "./mod.ts";

Deno.test("fathomanalytics", async (t) => {
  const { api } = fathomanalytics({
    apiKey: Deno.env.get("FATHOMANALYTICS_API_KEY"),
  });

  await t.step("find sites", async () => {
    const result = await api.sites.get();
    assertExists(result.data);
    assertEquals(Array.isArray(result.data), true);
  });

  await t.step("get site", async () => {
    const data = await api.sites["SITE_ID"].get();
    assertExists(data);
    assertEquals(typeof data, "object");
  });
});
