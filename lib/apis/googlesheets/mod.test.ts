import { assertExists } from "../../deps.ts";
import { googlesheets } from "./mod.ts";

Deno.test("googlesheets", async (t) => {
  const { api, getRows, getRow, addRows, updateRow, deleteRow } = googlesheets({
    googleServiceAccountCredentials: await Deno.readTextFile("./google.credentials.json"),
    scope: ["spreadsheets"],
    spreadsheetId: "1pYUPHA2Z1mXvY8xkTrdBsSBktACBzpNeWGnce8B2bcY",
  });

  const range = "directorio!A:H";

  await t.step("api", async () => {
    const result = await api.values[range].get();
    assertExists(result.range);
    assertExists(result.majorDimension);
    assertExists(result.values);
  });

  await t.step("getRows", async () => {
    const rows = await getRows(range);
    assertExists(rows);
  });
});
