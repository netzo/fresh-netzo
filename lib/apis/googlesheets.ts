import { auth } from "./create-api/auth/mod.ts";
import { createApi } from "./create-api/mod.ts";

export type GooglesheetsOptions = {
  googleServiceAccountCredentials: string;
  scope?: Array<
    | "drive"
    | "drive.readonly"
    | "drive.file"
    | "spreadsheets"
    | "spreadsheets.readonly"
  >;
  spreadsheetId: string;
};

/**
 * Factory function for the Google Sheets API
 *
 * @see https://netzo.io/docs/modules/integrations/apis/googlesheets
 *
 * @param {string} googleServiceAccountCredentials - the Google Service Account Credentials to use for authentication
 * @param {string} scope - the scope to use for authentication (default: ['spreadsheets.readonly'])
 * @param {string} spreadsheetId - the spreadsheet ID to construct the base URL
 * @returns {object} - an API client instance
 */
export const googlesheets = ({
  googleServiceAccountCredentials = Deno.env.get(
    "GOOGLE_SERVICE_ACCOUNT_CREDENTIALS",
  )!,
  scope = ["spreadsheets.readonly"],
  spreadsheetId = Deno.env.get("GOOGLESHEETS_SPREADSHEET_ID")!,
}: GooglesheetsOptions) => {
  const api = createApi({
    baseURL: `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`,
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      await auth({
        type: "googlejwtsa",
        googleServiceAccountCredentials,
        googleAuthOptions: {
          scope: scope.map((s) => `https://www.googleapis.com/auth/${s}`),
        },
      }, ctx);
    },
  });

  return api;
};

// utils:

// see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values
type Result = {
  range: string;
  majorDimension: "COLUMNS" | "ROWS";
  values: string[][];
};

export const resultToRows = (result: Result, headers?: string[]) => {
  let keys: string[];
  let rows: Result["values"];
  if (headers) {
    keys = headers;
    rows = result.values;
  } else {
    [keys, ...rows] = result.values;
  }
  return rows.map((row: string[]) =>
    keys.reduce(
      (acc: object, key: string, index: number) => ({
        ...acc,
        [key]: row[index],
      }),
      {},
    )
  );
};
