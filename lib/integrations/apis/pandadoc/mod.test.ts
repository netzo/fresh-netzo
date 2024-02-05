import { assertEquals, assertExists } from "../../../deps/std/assert/mod.ts";
import { pandadoc } from "./mod.ts";

Deno.test("[apis] pandadoc", async (t) => {
  const api = pandadoc({
    apiKey: Deno.env.get("PANDADOC_API_KEY"),
  });

  await t.step("find documents", async () => {
    const result = await api.documents.get();
    assertExists(result.results);
    assertEquals(Array.isArray(result.results), true);
  });

  await t.step("get document", async () => {
    const resultData = await api.documents["DOCUMENT_ID"].details.get();
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });

  await t.step("find contacts", async () => {
    const result = await api.contacts.get();
    assertExists(result.results);
    assertEquals(Array.isArray(result.results), true);
  });
});
