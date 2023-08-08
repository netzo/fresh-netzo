import { assertEquals, assertExists } from "../deps.ts";
import { chartmogul } from "./mod.ts";

Deno.test("chartmogul", async (t) => {
  const { api } = chartmogul({
    apiKey: Deno.env.get("CHARTMOGUL_API_KEY"),
  });

  await t.step("find customers", async () => {
    const result = await api.customers.get();
    assertExists(result.entries);
    assertEquals(Array.isArray(result.entries), true);
  });

  await t.step("get customer", async () => {
    const data = await api.customers["CUSTOMER_UUID"].get();
    assertExists(data);
    assertEquals(typeof data, "object");
  });

  await t.step("add customer", async () => {
    const data = await api.customers.post({
      data_source_uuid: "DATA_SOURCE_UUID",
      external_id: "EXTERNAL_ID",
    });
    assertExists(data);
    assertEquals(typeof data, "object");
  });

  await t.step("update customer", async () => {
    const data = await api.customers["CUSTOMER_UUID"].patch({
      email: "new-email@email.com",
    });
    assertExists(data);
    assertEquals(typeof data, "object");
  });

  await t.step("delete customer", async () => {
    const data = await api.customers["CUSTOMER_UUID"].delete();
    assertExists(data);
    assertEquals(typeof data, "object");
  });

  await t.step("find customer subsciptions", async () => {
    const result = await api.import.customers["CUSTOMER_UUID"].subscriptions
      .get();
    assertExists(result.subscriptions);
    assertEquals(Array.isArray(result.subscriptions), true);
  });

  await t.step("find customer invoices", async () => {
    const result = await api.import.customers["CUSTOMER_UUID"].invoices.get();
    assertExists(result.invoices);
    assertEquals(Array.isArray(result.invoices), true);
  });

  await t.step("find invoices", async () => {
    const result = await api.invoices.get();
    assertExists(result.invoices);
    assertEquals(Array.isArray(result.invoices), true);
  });

  await t.step("get invoice", async () => {
    const data = await api.invoices["INVOICE_UUID"].get();
    assertExists(data);
    assertEquals(typeof data, "object");
  });
});
