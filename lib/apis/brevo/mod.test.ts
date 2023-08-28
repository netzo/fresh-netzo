import "https://deno.land/std@0.198.0/dotenv/load.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { brevo } from "./mod.ts";

Deno.test("brevo", async (t) => {
  const { api } = brevo({
    apiKey: Deno.env.get("BREVO_API_KEY")!,
  });

  await t.step("find contacts", async () => {
    const result = await api.contacts.get();
    assertExists(result.contacts);
    assertEquals(Array.isArray(result.contacts), true);
  });

  await t.step("get contact", async () => {
    const resultData = await api.contacts["CONTACT_IDENTIFIER"].get();
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });

  // await t.step("add contact", async () => {
  //   const resultData = await api.contacts.post({ email: "example@email.com" });
  //   assertExists(resultData);
  //   assertEquals(typeof resultData, "object");
  // });

  // await t.step("update contact", async () => {
  //   const result = await api.contacts["CONTACT_IDENTIFIER"].put({
  //     attributes: {
  //       "EMAIL": "updated-email@email.com",
  //     },
  //   });
  //   assertExists(result);
  //   assertEquals(result.status, 204);
  // });

  await t.step("find email campaigns", async () => {
    const result = await api.emailCampaigns.get();
    assertExists(result.campaigns);
    assertEquals(Array.isArray(result.campaigns), true);
  });

  await t.step("find companies", async () => {
    const result = await api.companies.get();
    assertExists(result.items);
    assertEquals(Array.isArray(result.items), true);
  });
});
