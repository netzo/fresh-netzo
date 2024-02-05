import "../../../deps/std/dotenv/load.ts";
import { assertEquals, assertExists } from "../../../deps/std/assert/mod.ts";
import { stripe } from "./mod.ts";

Deno.test("[apis] stripe", async (t) => {
  const api = stripe({
    apiKey: Deno.env.get("STRIPE_API_KEY")!,
  });

  await t.step("find subscriptions", async () => {
    const result = await api.subscriptions.get();
    assertExists(result.data);
    assertEquals(Array.isArray(result.data), true);
  });

  //IDs required

  // await t.step("find subscription items", async () => {
  //   const result = await api.subscription_items.get({
  //     subscription: "SUBSCRIPTION_ID",
  //   });
  //   assertExists(result.data);
  //   assertEquals(Array.isArray(result.data), true);
  // });

  await t.step("find customers", async () => {
    const result = await api.customers.get();
    assertExists(result.data);
    assertEquals(Array.isArray(result.data), true);
  });

  await t.step("find invoices", async () => {
    const result = await api.invoices.get();
    assertExists(result.data);
    assertEquals(Array.isArray(result.data), true);
  });

  await t.step("find charges", async () => {
    const result = await api.charges.get();
    assertExists(result.data);
    assertEquals(Array.isArray(result.data), true);
  });

  await t.step("find plans", async () => {
    const result = await api.plans.get();
    assertExists(result.data);
    assertEquals(Array.isArray(result.data), true);
  });

  await t.step("find transactions", async () => {
    const result = await api.balance_transactions.get();
    assertExists(result.data);
    assertEquals(Array.isArray(result.data), true);
  });
});
