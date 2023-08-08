import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { airtable } from "./mod.ts";

Deno.test("airtable", async (t) => {
  const { api } = airtable({
    personalAccessToken: Deno.env.get("AIRTABLE_PERSONAL_ACCESS_TOKEN"),
  });

  await t.step("find records", async () => {
    const result = await api["DATABASE_ID"]["TABLE_ID_OR_NAME"].get();
    assertExists(result.records);
    assertEquals(Array.isArray(result.records), true);
  });

  await t.step("add records", async () => {
    const result = await api["DATABASE_ID"]["TABLE_ID_OR_NAME"].post({
      records: [
        {
          fields: {
            address: "333 Post St",
          },
        },
      ],
    });
    assertExists(result.records);
    assertEquals(Array.isArray(result.records), true);
  });

  await t.step("update records", async () => {
    const result = await api["DATABASE_ID"]["TABLE_ID_OR_NAME"].patch({
      records: [
        {
          fields: {
            Address: "Updated Address",
          },
          id: "RECORD_ID",
        },
      ],
    });
    assertExists(result.records);
    assertEquals(Array.isArray(result.records), true);
  });

  await t.step("delete records", async () => {
    const result = await api["DATABASE_ID"]["TABLE_ID_OR_NAME"].delete([
      "RECORD_ID",
    ]);
    assertExists(result.records);
    assertEquals(Array.isArray(result.records), true);
  });
});
