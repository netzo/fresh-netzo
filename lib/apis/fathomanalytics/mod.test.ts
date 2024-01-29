import { assertEquals, assertExists } from "../../deps/std/assert/mod.ts";
import { fathomanalytics } from "./mod.ts";

Deno.test("[apis] fathomanalytics", async (t) => {
  const api = fathomanalytics({
    apiKey: Deno.env.get("FATHOMANALYTICS_API_KEY"),
  });

  await t.step("find sites", async () => {
    const result = await api.sites.get();
    assertExists(result.resultData);
    assertEquals(Array.isArray(result.resultData), true);
  });

  await t.step("get site", async () => {
    const resultData = await api.sites["SITE_ID"].get();
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });
});
