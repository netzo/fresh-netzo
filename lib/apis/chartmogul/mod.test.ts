import "../../deps/std/dotenv/load.ts";
import { assertEquals, assertExists } from "../../deps/std/assert/mod.ts";
import { chartmogul } from "./mod.ts";

Deno.test("[apis] chartmogul", async (t) => {
  const api = chartmogul({
    apiKey: Deno.env.get("CHARTMOGUL_API_KEY")!,
  });

  await t.step("find customers", async () => {
    const result = await api.customers.get();
    assertExists(result.entries);
    assertEquals(Array.isArray(result.entries), true);
  });

  await t.step("get customer", async () => {
    const resultData = await api.customers["CUSTOMER_UUID"].get();
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });

  await t.step("add customer", async () => {
    const resultData = await api.customers.post({
      data_source_uuid: "DATA_SOURCE_UUID",
      external_id: "EXTERNAL_ID",
    });
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });

  // await t.step("update customer", async () => {
  //   const resultData = await api.customers["CUSTOMER_UUID"].patch({
  //     email: "new-email@email.com",
  //   });
  //   assertExists(resultData);
  //   assertEquals(typeof resultData, "object");
  // });

  // await t.step("delete customer", async () => {
  //   const resultData = await api.customers["CUSTOMER_UUID"].delete();
  //   assertExists(resultData);
  //   assertEquals(typeof resultData, "object");
  // });

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
    const resultData = await api.invoices["INVOICE_UUID"].get();
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });
});
