import { assertEquals, assertExists } from "../deps.ts";
import { holded } from "./mod.ts";

Deno.test("holded", async (t) => {
  const { api } = holded({
    apiKey: Deno.env.get("HOLDED_API_KEY"),
  });

  await t.step("find contacts", async () => {
    const data = await api.invoicing.v1.contacts.get();
    assertExists(data);
    assertEquals(Array.isArray(data), true);
  });

  await t.step("get contact", async () => {
    const data = await api.invoicing.v1.contacts["CONTACT_ID"].get();
    assertExists(data);
    assertEquals(typeof data, "object");
  });
});
