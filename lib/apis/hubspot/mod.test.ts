import "https://deno.land/std@0.198.0/dotenv/load.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { hubspot } from "./mod.ts";

Deno.test("hubspot", async (t) => {
  const { api } = hubspot({
    privateAppAccessToken: Deno.env.get("HUBSPOT_PRIVATE_APP_ACCESS_TOKEN")!,
  });

  await t.step("find contacts", async () => {
    const result = await api.crm.v3.objects.contacts.get();
    assertExists(result.results);
    assertEquals(Array.isArray(result.results), true);
  });

  //CUD operations:

  // await t.step("add contact", async () => {
  //   const resultData = await api.crm.v3.objects.contacts.post({
  //     properties: {
  //       company: "Test company",
  //       email: "example@email.com",
  //     },
  //   });
  //   assertExists(resultData);
  //   assertEquals(typeof resultData, "object");
  // });

  // await t.step("update contact", async () => {
  //   const resultData = await api.crm.v3.objects.contacts["CONTACT_ID"].patch({
  //     properties: {
  //       company: "New Company Name",
  //     },
  //   });
  //   assertExists(resultData);
  //   assertEquals(typeof resultData, "object");
  // });

  // await t.step("delete contact", async () => {
  //   const result = await api.crm.v3.objects.contacts["CONTACT_ID"].delete();
  //   assertExists(result);
  //   assertEquals(result.status, 204);
  // });

  //forbidden:

  // await t.step("find forms", async () => {
  //   const resultData = await api.forms.v2.forms.get();
  //   assertExists(resultData);
  //   assertEquals(Array.isArray(resultData), true);
  // });

  // await t.step("find submissions", async () => {
  //   const result = await api["form-integrations"].v1.submissions
  //     .forms["FORM_ID"].get();
  //   assertExists(result.results);
  //   assertEquals(Array.isArray(result.results), true);
  // });

  await t.step("find deals", async () => {
    const result = await api.crm.v3.objects.deals.get();
    assertExists(result.results);
    assertEquals(Array.isArray(result.results), true);
  });

  // CUD operations:

  // await t.step("add deal", async () => {
  //   const resultData = await api.crm.v3.objects.deals.post({
  //     properties: {
  //       dealname: "Test deal",
  //     },
  //   });
  //   assertExists(resultData);
  //   assertEquals(typeof resultData, "object");
  // });
});
