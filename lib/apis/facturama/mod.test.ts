import { assertEquals, assertExists } from "../deps.ts";
import { facturama } from "./mod.ts";

Deno.test("facturama", async (t) => {
  const { api } = facturama({
    username: Deno.env.get("FACTURAMA_USERNAME"),
    password: Deno.env.get("FACTURAMA_PASSWORD"),
  });

  await t.step("get product", async () => {
    const data = await api.Product["PRODUCT_ID"].get();
    assertExists(data);
    assertEquals(typeof data, "object");
  });
});
