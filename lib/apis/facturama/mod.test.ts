import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.204.0/testing/asserts.ts";
import { facturama } from "./mod.ts";

Deno.test("facturama", async (t) => {
  const { api } = facturama({
    username: Deno.env.get("FACTURAMA_USERNAME"),
    password: Deno.env.get("FACTURAMA_PASSWORD"),
  });

  await t.step("get product", async () => {
    const resultData = await api.Product["PRODUCT_ID"].get();
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });
});
