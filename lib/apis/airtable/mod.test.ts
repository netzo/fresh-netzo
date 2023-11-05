import "https://deno.land/std@0.205.0/dotenv/load.ts";
import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.205.0/testing/asserts.ts";
import { airtable } from "./mod.ts";

Deno.test("[apis] airtable", async (t) => {
  const { api } = airtable({
    personalAccessToken: Deno.env.get("AIRTABLE_PERSONAL_ACCESS_TOKEN")!,
  });

  let database_id = "";
  let table_id = "";

  await t.step("find databases", async () => {
    const result = await api.meta.bases.get();
    assertExists(result.bases);
    assertEquals(Array.isArray(result.bases), true);
    database_id = result.bases[0].id;
  });

  await t.step("find tables", async () => {
    const result = await api.meta.bases[database_id].tables.get();
    assertExists(result.tables);
    assertEquals(Array.isArray(result.tables), true);
    table_id = result.tables[0].id;
  });

  await t.step("find records", async () => {
    const result = await api[database_id][table_id].get();
    assertExists(result.records);
    assertEquals(Array.isArray(result.records), true);
  });

  // await t.step("add records", async () => {
  //   const result = await api["DATABASE_ID"]["TABLE_ID_OR_NAME"].post({
  //     records: [
  //       {
  //         fields: {
  //           address: "333 Post St",
  //         },
  //       },
  //     ],
  //   });
  //   assertExists(result.records);
  //   assertEquals(Array.isArray(result.records), true);
  // });

  // await t.step("update records", async () => {
  //   const result = await api["DATABASE_ID"]["TABLE_ID_OR_NAME"].patch({
  //     records: [
  //       {
  //         fields: {
  //           Address: "Updated Address",
  //         },
  //         id: "RECORD_ID",
  //       },
  //     ],
  //   });
  //   assertExists(result.records);
  //   assertEquals(Array.isArray(result.records), true);
  // });

  // await t.step("delete records", async () => {
  //   const result = await api["DATABASE_ID"]["TABLE_ID_OR_NAME"].delete([
  //     "RECORD_ID",
  //   ]);
  //   assertExists(result.records);
  //   assertEquals(Array.isArray(result.records), true);
  // });
});
