import { assertEquals, assertExists } from "../deps.ts";
import { sendgrid } from "./mod.ts";

Deno.test("sendgrid", async (t) => {
  const { api } = sendgrid({
    apiKey: Deno.env.get("SENDGRID_API_KEY"),
  });

  await t.step("find lists", async () => {
    const result = await api.marketing.lists.get();
    assertExists(result.result);
    assertEquals(Array.isArray(result.result), true);
  });

  await t.step("get list", async () => {
    const data = await api.marketing.lists["LIST_ID"].get();
    assertExists(data);
    assertEquals(typeof data, "object");
  });
});
