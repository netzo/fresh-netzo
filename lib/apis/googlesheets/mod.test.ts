import "https://deno.land/std@0.198.0/dotenv/load.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { googlesheets } from "./mod.ts";

Deno.test("googlesheets", async (t) => {
  const { api, resultToRows } = googlesheets({
    googleServiceAccountCredentials: Deno.env.get(
      "GOOGLE_SERVICE_ACCOUNT_CREDENTIALS",
    )!,
    scope: ["spreadsheets"],
    spreadsheetId: Deno.env.get("GOOGLESHEETS_SPREADSHEET_ID")!,
  });

  const range = "Sheet1!A:D";
  const range_to_update = "Sheet1!A32:D32";
  const range_to_delete = range_to_update;

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

  await t.step("get row", async () => {
    const result = await api.values[range].get();
    assertExists(result.values);
    assertExists(resultToRows(result));
    assertEquals(Array.isArray(resultToRows(result)), true);
  });

  await t.step("get row", async () => {
    const result = await api.values[range].get();
    assertExists(result.values[1]);
    assertExists(resultToRows(result)[0]);
    assertEquals(Array.isArray(resultToRows(result)[0]), true);
  });

  //To be completed
  // await t.step("add row", async () => {

  // })

  await t.step("update row", async () => {
    const result = await api.values[range_to_update].put({
      values: ["updatedValue1", "updatedValue2, updatedValue3, updatedValue4"],
    });
    assertExists(result.updatedData.values);
    assertExists(resultToRows(result.updatedData));
    assertEquals(Array.isArray(resultToRows(result.updatedData)), true);
  });

  await t.step("delete row", async () => {
    const data = await api.values[range_to_delete].put({
      values: ["updatedValue1", "updatedValue2, updatedValue3, updatedValue4"],
    });
    assertExists(data);
    assertEquals(typeof data, "object");
  });
});
