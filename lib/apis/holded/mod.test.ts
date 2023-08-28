import { assertEquals, assertExists } from "../deps.ts";
import { holded } from "./mod.ts";

Deno.test("holded", async (t) => {
  const { api } = holded({
    apiKey: Deno.env.get("HOLDED_API_KEY"),
  });

  await t.step("find contacts", async () => {
    const resultData = await api.invoicing.v1.contacts.get();
    assertExists(resultData);
    assertEquals(Array.isArray(resultData), true);
  });

  await t.step("get contact", async () => {
    const resultData = await api.invoicing.v1.contacts["CONTACT_ID"].get();
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });
});
