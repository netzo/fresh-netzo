export interface ValueRange {
  range: string;
  majorDimension: string;
  values: Array<[]>;
}

//Request Body:
export interface RequestAddOrUpdateValues {
  values: Array<string[]>;
}

export interface UpdateValuesResponse {
  spreadsheetId: string;
  updatedRange: string;
  updatedRows: number;
  updatedColumns: number;
  updatedCells: number;
  updatedData: ValueRange;
}

export interface AddValuesResponse {
  spreadsheetId: string;
  tableRange: string;
  updates: UpdateValuesResponse;
}

//Query parameters:

export interface QueryAddOrUpdateRows {
  valueInputOption: "RAW" | "USER_ENTERED";
  insertDataOption?: "OVERWRITE" | "INSERT_ROWS";
  includeValuesInResponse?: boolean;
  responseValueRenderOption?:
    | "FORMATTED_VALUE"
    | "UNFORMATTED_VALUE"
    | "FORMULA";
  responseDateTimeRenderOption?: "SERIAL_NUMBER" | "FORMATTED_STRING";
}

export interface DeleteValuesResponse {
  spreadsheetId: string;
  clearedRange: string;
}
