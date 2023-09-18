import "https://deno.land/std@0.198.0/dotenv/load.ts";
import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { googlesheets } from "./mod.ts";

Deno.test("googlesheets", async (t) => {
  const { api, resultToRows } = googlesheets({
    googleServiceAccountCredentials: Deno.env.get(
      "GOOGLE_SERVICE_ACCOUNT_CREDENTIALS",
    )!,
    scope: ["spreadsheets"],
    spreadsheetId: "1XmMvKGQl57ZK2B8kb05YqyNYsr1tiK1wh59OJVsNyJI",
  });

  const range = "Sheet1!A:D";
  const headerless_range = "Sheet1!A2:D";
  const range_to_addOrUpdate = "Sheet1!A32:D32";
  const range_to_delete = range_to_addOrUpdate;

  await t.step("api", async () => {
    const result = await api.values[range].get();
    assertExists(result.range);
    assertExists(result.majorDimension);
    assertExists(result.values);
  });

  await t.step("get rows", async () => {
    const result = await api.values[range].get();
    assertExists(result.values);
    assertExists(resultToRows(result));
    assertEquals(Array.isArray(resultToRows(result)), true);
  });

  await t.step("get headerless rows", async () => {
    const result = await api.values[headerless_range].get();
    const rows = resultToRows(result, [
      "header1",
      "header2",
      "header3",
      "header4",
    ]);
    assertExists(result.values);
    assertExists(rows);
    assertEquals(typeof rows, "object");
  });

  await t.step("get row", async () => {
    const result = await api.values[range].get();
    assertExists(result.values[1]);
    assertExists((resultToRows(result))[0]);
    assertEquals(typeof (resultToRows(result)[0]), "object");
  });

  await t.step("get headerless row", async () => {
    const result = await api.values[headerless_range].get();
    const rows = resultToRows(result, [
      "header1",
      "header2",
      "header3",
      "header4",
    ]);
    assertExists(result.values[0]);
    assertExists(rows[0]);
    assertEquals(typeof (rows[0]), "object");
  });

  await t.step("add row", async () => {
    const request = { values: [["value1", "value2", "value3"]] };

    const query = {
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      includeValuesInResponse: true,
    };

    const result = await api.values[`${range_to_addOrUpdate}:append`].post(
      request,
      query,
    );
    assertExists(result.updates.updatedData.values);
    assertEquals(Array.isArray(result.updates.updatedData.values), true);
  });

  await t.step("update row", async () => {
    const query = {
      valueInputOption: "USER_ENTERED",
      includeValuesInResponse: true,
    };

    const request = { values: [["updatedValue1"]] };
    const result = await api.values[range_to_addOrUpdate].put(request, query);
    assertExists(result.updatedData.values);
    assertEquals(Array.isArray(result.updatedData.values), true);
  });

  await t.step("delete row", async () => {
    const resultData = await api.values[`${range_to_delete}:clear`].post();
    assertExists(resultData);
    assertEquals(typeof resultData, "object");
  });
});
