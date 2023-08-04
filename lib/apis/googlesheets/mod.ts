import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

export interface GoogleSheetsOptions {
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
}: GoogleSheetsOptions) => {
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

  const resultToRows = <T>(result: any) => {
    const [keys, ...rows] = result.values;
    return rows.map((row: object[]) =>
      keys.reduce(
        (acc: object, key: string, index: number) => ({
          ...acc,
          [key]: row[index],
        }),
      ), {});
  };

  /**
   * Get spreadheet rows from a given range (first row treated as header)
   * @example const rows = await getRows<{ name: string }>('A1:A10');
   * @param {string} range - the range to get rows from
   * @returns {Promise<T[]>} - an array of rows
   */
  const getRows = async <T>(range: string): Promise<T[]> => {
    const result = await api.values[range].get();
    return resultToRows(result);
  };

  /**
   * Get spreadheet row from a given range (first row treated as header)
   * @example const row = await getRow<{ name: string }>('A1:A1');
   * @param {string} range - the range to get row from
   * @returns {Promise<T>} - a row
   */
  const getRow = async <T>(range: string): Promise<T> => {
    const result = await api.values[range].get();
    return resultToRows(result)[0];
  };

  /**
   * Add rows to a given range (first row treated as header)
   * @example const rows = await addRows<{ name: string }>('A1:A10', [{ name: 'John' }]);
   * @param {string} range - the range to add rows to
   * @param {T[]} rows - an array of rows to add
   * @returns {Promise<T[]>} - an array of rows
   */
  const addRows = async <T>(range: string, rows: T[]): Promise<T[]> => {
    const result = await api.values[range].post({ values: rows });
    return resultToRows(result);
  };

  /**
   * Update row in a given range (first row treated as header)
   * @example const row = await updateRow<{ name: string }>('A1:A1', { name: 'John' });
   * @param {string} range - the range to update row in
   * @param {T} row - a row to update
   * @returns {Promise<T>} - a row
   */
  const updateRow = async <T>(range: string, row: T): Promise<T> => {
    const result = await api.values[range].put({ values: [row] });
    return resultToRows(result)[0];
  };

  /**
   * Delete row in a given range (first row treated as header)
   * @example const row = await deleteRow<{ name: string }>('A1:A1');
   * @param {string} range - the range to delete row in
   * @returns {Promise<T>} - a row
   */
  const deleteRow = async <T>(range: string): Promise<T> => {
    const result = await api.values[range].delete();
    return resultToRows(result)[0];
  };

  return { api, getRows, getRow, addRows, updateRow, deleteRow };
};
