import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { restdb } from "./mod.ts";

Deno.test("restdb", async (t) => {
  const { api } = restdb({
    apiKey: Deno.env.get("RESTDB_API_KEY"),
    databaseURL: Deno.env.get("RESTDB_DATABASE_URL"),
  });

  await t.step("find records", async () => {
    const resultData = await api["COLLECTION_NAME"].get();
    assertExists(resultData);
    assertEquals(Array.isArray(resultData), true);
  });
});
