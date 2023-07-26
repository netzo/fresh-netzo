import { assertExists } from "../../deps.ts";
import { googlesheets } from "./mod.ts";

Deno.test("googlesheets", async (t) => {
  const { options } = await import("./googlesheets.options.ts");
  const { api, getRows, getRow, addRows, updateRow, deleteRow } = googlesheets(options);

  const range = "Sheet1!A:D";

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
