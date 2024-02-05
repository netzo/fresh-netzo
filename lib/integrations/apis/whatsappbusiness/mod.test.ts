import { assertEquals, assertExists } from "../../../deps/std/assert/mod.ts";
import { whatsappbusiness } from "./mod.ts";

Deno.test("[apis] whatsappbusiness", async (t) => {
  const api = whatsappbusiness({
    businessAccountId: Deno.env.get("WHATSAPPBUSINESS_BUSINESS_ACCOUNT_ID")!,
    permanentToken: Deno.env.get("WHATSAPPBUSINESS_PERMANENT_TOKEN")!,
  });

  await t.step("get business profile", async () => {
    const result = await api["PHONE_NUMBER_ID"].whatsapp_business_profile.get();
    assertExists(result.data);
    assertEquals(Array.isArray(result.data), true);
  });
});
