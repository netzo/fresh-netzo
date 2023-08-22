import { assertEquals, assertExists } from "../deps.ts";
import { restdb } from "./mod.ts";

Deno.test("restdb", async (t) => {
  const { api } = restdb({
    apiKey: Deno.env.get("RESTDB_API_KEY"),
    databaseURL: Deno.env.get("RESTDB_DATABASE_URL"),
  });

  await t.step("find records", async () => {
    const data = await api["COLLECTION_NAME"].get();
    assertExists(data);
    assertEquals(Array.isArray(data), true);
  });
});
