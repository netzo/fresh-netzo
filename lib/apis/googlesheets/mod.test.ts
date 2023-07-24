import { assertExists } from "../../deps.ts";
import { googlesheets } from "./mod.ts";

Deno.test("googlesheets", async () => {
  const { api, getRows, getRow, addRows, updateRow, deleteRow } = googlesheets({
    googleServiceAccountCredentials: await Deno.readTextFile("./config.json"),
    googleAuthOptions: {
      scope: ["https://www.googleapis.com/auth/spreadsheets"],
    },
    spreadsheetId: "1pYUPHA2Z1mXvY8xkTrdBsSBktACBzpNeWGnce8B2bcY",
  });

  const range = "directorio!A:H";

  const data1 = await api.values[range].get();
  assertExists(data1);
  const data2 = await getRows(range);
  assertExists(data2);
});
