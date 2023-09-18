import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { mailchimpmarketing } from "./mod.ts";

Deno.test("mailchimpmarketing", async (t) => {
  const { api } = mailchimpmarketing({
    marketingApiKey: Deno.env.get("MAILCHIMP_MARKETING_API_KEY"),
    dataCenter: Deno.env.get("MAILCHIMP_DATA_CENTER"),
  });

  await t.step("find campaigns", async () => {
    const result = await api.campaigns.get();
    assertExists(result.campaigns);
    assertEquals(Array.isArray(result.campaigns), true);
  });

  await t.step("get campaign", async () => {
    const resultData = await api.campaigns["CAMPAIGN_ID"].get();
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });

  await t.step("get campaign content", async () => {
    const resultData = await api.campaigns["CAMPAIGN_ID"].content.get();
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });
});
