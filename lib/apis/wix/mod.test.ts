import { assertEquals, assertExists } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { wix } from "./mod.ts";

Deno.test("wix", async (t) => {
  const { api } = wix({
    accountId: Deno.env.get("WIX_ACCOUNT_ID"),
    siteId: Deno.env.get("WIX_SITE_ID"),
    apiKey: Deno.env.get("WIX_API_KEY"),
  });

  await t.step("get site properties", async () => {
    const result = await api["site-properties"].v4.properties.get();
    assertExists(result.properties);
    assertEquals(typeof result.properties, "object");
  });

  await t.step("find contacts", async () => {
    const result = await api.contacts.v4.contacts.get();
    assertExists(result.contacts);
    assertEquals(Array.isArray(result.contacts), true);
  });
});
