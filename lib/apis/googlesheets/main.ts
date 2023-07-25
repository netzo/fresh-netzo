import { googlesheets } from "./mod.ts";

Deno.serve(async (_req) => {
  const { api, getRows } = googlesheets({
    googleServiceAccountCredentials: await Deno.readTextFile("./config.json"),
    googleAuthOptions: {
      scope: ["https://www.googleapis.com/auth/spreadsheets"],
    },
    spreadsheetId: "1pYUPHA2Z1mXvY8xkTrdBsSBktACBzpNeWGnce8B2bcY",
  });

  const range = "directorio!A:H";

  const data1 = await api.values[range].get();
  const data2 = await getRows(range);

  return Response.json({ data1, data2 });
});
