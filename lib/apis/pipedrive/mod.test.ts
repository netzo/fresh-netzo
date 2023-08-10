import { assertEquals, assertExists } from "../deps.ts";
import { pipedrive } from "./mod.ts";

Deno.test("pipedrive", async (t) => {
  const { api } = pipedrive({
    apiToken: Deno.env.get("PIPEDRIVE_API_TOKEN")!,
    companyDomain: Deno.env.get("PIPEDRIVE_COMPANY_DOMAIN")!,
  });

  await t.step("find deals", async () => {
    const result = await api.deals.get();
    assertExists(result.data);
    assertEquals(Array.isArray(result.data), true);
  });

  await t.step("search deals", async () => {
    const result = await api.deals.search.get({ term: "" });
    assertExists(result.data.items);
    assertEquals(Array.isArray(result.data.items), true);
  });

  await t.step("add deal", async () => {
    const result = await api.deals.post({
      title: "Test Deal",
    });
    assertExists(result.data);
    assertEquals(typeof result.data, "object");
  });

  await t.step("update deal", async () => {
    const result = await api.deals["DEAL_ID"].put({ title: "Updated Title" });
    assertExists(result.data);
    assertEquals(typeof result.data, "object");
  });

  await t.step("delete deal", async () => {
    const result = await api.deals["DEAL_ID"].delete();
    assertExists(result.data);
    assertEquals(typeof result.data, "object");
  });

  await t.step("find persons", async () => {
    const result = await api.persons.get();
    assertExists(result.data);
    assertEquals(Array.isArray(result.data), true);
  });

  await t.step("search persons", async () => {
    const result = await api.persons.search.get({ term: "" });
    assertExists(result.data.items);
    assertEquals(Array.isArray(result.data.items), true);
  });

  await t.step("add person", async () => {
    const result = await api.persons.post({ name: "John Doe" });
    assertExists(result.data);
    assertEquals(typeof result.data, "object");
  });

  await t.step("update person", async () => {
    const result = await api.persons["PERSON_ID"].put({ name: "Jane Doe" });
    assertExists(result.data);
    assertEquals(typeof result.data, "object");
  });

  await t.step("delete person", async () => {
    const result = await api.persons["PERSON_ID"].delete();
    assertExists(result.data);
    assertEquals(typeof result.data, "object");
  });
});
