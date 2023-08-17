import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
export type {
  AddValuesResponse,
  DeleteValuesResponse,
  RequestAddOrUpdateValues,
  UpdateValuesResponse,
  ValueRange,
} from "./types.ts";
export interface GooglesheetsOptions {
  googleServiceAccountCredentials: string;
  scope?: Array<
    | "drive"
    | "drive.readonly"
    | "drive.file"
    | "spreadsheets"
    | "spreadsheets.readonly"
  >;
  spreadsheetId: string;
}

/**
 * SDK constructor function for the Google Sheets API
 *
 * @see https://netzo.io/docs/netzo/apis/googlesheets
 *
 * @param {string} googleServiceAccountCredentials - the Google Service Account Credentials to use for authentication
 * @param {string} scope - the scope to use for authentication (default: ['spreadsheets.readonly'])
 * @param {string} spreadsheetId - the spreadsheet ID to construct the base URL
 * @returns {object} - an object of multiple utilities for the API
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

  const resultToRows = (result: any, headers?: string[]) => {
    let keys: string[];
    let rows: Array<[]>;
    if (headers) {
      keys = headers;
      rows = result.values;
    } else {
      [keys, ...rows] = result.values;
    }
    return rows.map((row: object[]) =>
      keys.reduce(
        (acc: object, key: string, index: number) => ({
          ...acc,
          [key]: row[index],
        }),
        {},
      )
    );
  };

  return { api, resultToRows };
};
