export interface ValueRange {
  range: string;
  majorDimension: string;
  values: Array<[]>;
}

//Request Body:
export interface RequestAddOrUpdateValues {
  values: Array<any>;
}

export interface UpdateValuesResponse {
  spreadsheetId: string;
  updatedRange: string;
  updatedRows: number;
  updatedColumns: number;
  updatedCells: number;
  updatedData: {};
}

export interface AddValuesResponse {
  spreadsheetId: string;
  tableRange: string;
  updates: UpdateValuesResponse;
}

//Query parameters for adding rows. Not possible yet:

// export interface QueryAddRows {
//     valueInputOption: "RAW" | "USER_ENTERED"
//     insertDataOption: "OVERWRITE" | "INSERT_ROWS"
//     includeValuesInResponse: boolean
//     responseValueRenderOption: "FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA"
//     responseDateTimeRenderOption: "SERIAL_NUMBER" | "FORMATTED_STRING"
// }

export interface DeleteValuesResponse {
  spreadsheetId: string;
  clearedRange: string;
}