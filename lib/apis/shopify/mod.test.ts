import "https://deno.land/std@0.204.0/dotenv/load.ts";
import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.204.0/testing/asserts.ts";
import { shopify } from "./mod.ts";

Deno.test("shopify", async (t) => {
  const { api } = shopify({
    storeName: Deno.env.get("SHOPIFY_STORE_NAME")!,
    apiKey: Deno.env.get("SHOPIFY_API_KEY")!,
    apiVersion: "2023-07",
  });

  await t.step("find customers", async () => {
    const result = await api["customers.json"].get();
    assertExists(result.customers);
    assertEquals(Array.isArray(result.customers), true);
  });

  await t.step("get customer", async () => {
    const result = await api.customers["CUSTOMER_ID.json"].get();
    assertExists(result.customer);
    assertEquals(typeof result.customer, "object");
  });

  await t.step("find customer's orders", async () => {
    const result = await api.customers["CUSTOMER_ID"]["orders.json"].get();
    assertExists(result.orders);
    assertEquals(Array.isArray(result.orders), true);
  });

  //CUD operations:

  // await t.step("add customer", async () => {
  //   const result = await api["customers.json"].post({
  //     customer: {
  //       first_name: "John",
  //       last_name: "Doe",
  //       email: "example@email.com",
  //     },
  //   });
  //   assertExists(result.customer);
  //   assertEquals(typeof result.customer, "object");
  // });

  // await t.step("update customer", async () => {
  //   const result = await api.customers["CUSTOMER_ID.json"].put({
  //     customer: {
  //       email: "new-email@email.com",
  //     },
  //   });
  //   assertExists(result.customer);
  //   assertEquals(typeof result.customer, "object");
  // });

  await t.step("find orders", async () => {
    const result = await api["orders.json"].get();
    assertExists(result.orders);
    assertEquals(Array.isArray(result.orders), true);
  });

  await t.step("get order", async () => {
    const result = await api.orders["ORDER_ID.json"].get();
    assertExists(result.order);
    assertEquals(typeof result.order, "object");
  });

  await t.step("find products", async () => {
    const result = await api["products.json"].get();
    assertExists(result.products);
    assertEquals(Array.isArray(result.products), true);
  });

  await t.step("get product", async () => {
    const result = await api.products["PRODUCT_ID.json"].get();
    assertExists(result.product);
    assertEquals(typeof result.product, "object");
  });

  await t.step("find payouts", async () => {
    const result = await api.shopify_payments["payouts.json"].get();
    assertExists(result.payouts);
    assertEquals(Array.isArray(result.payouts), true);
  });
});
