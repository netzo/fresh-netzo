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

  await t.step("add contact", async () => {
    const data = await api.crm.v3.objects.contacts.post({
      properties: {
        company: "Test company",
        email: "example@email.com",
      },
    });
    assertExists(data);
    assertEquals(typeof data, "object");
  });

  await t.step("update contact", async () => {
    const data = await api.crm.v3.objects.contacts["CONTACT_ID"].patch({
      properties: {
        company: "New Company Name",
      },
    });
    assertExists(data);
    assertEquals(typeof data, "object");
  });

  await t.step("delete contact", async () => {
    const result = await api.crm.v3.objects.contacts["CONTACT_ID"].delete();
    assertExists(result);
    assertEquals(result.status, 204);
  });

  await t.step("find forms", async () => {
    const data = await api.forms.v2.forms.get();
    assertExists(data);
    assertEquals(Array.isArray(data), true);
  });

  await t.step("find submissions", async () => {
    const result = await api["form-integrations"].v1.submissions
      .forms["FORM_ID"].get();
    assertExists(result.results);
    assertEquals(Array.isArray(result.results), true);
  });

  await t.step("find deals", async () => {
    const result = await api.crm.v3.objects.deals.get();
    assertExists(result.results);
    assertEquals(Array.isArray(result.results), true);
  });

  await t.step("add deal", async () => {
    const data = await api.crm.v3.objects.deals.post({
      properties: {
        dealname: "Test deal",
      },
    });
    assertExists(data);
    assertEquals(typeof data, "object");
  });
});
