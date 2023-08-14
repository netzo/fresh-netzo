export interface QueryRecords {
  Action: "Find" | "Add" | "Edit" | "Delete";
  Properties?: {
    Locale?: string;
    Location?: string;
    Timezone?: string;
    UserSettings?: {};
  };
  Rows?: Array<{
    [key: string]: any;
  }>;
}

export interface Records {
  Rows: Array<{
    [key: string]: any;
  }>;
}

export interface QueryAddRecords extends QueryRecords {
  Action: "Add";
}

export interface QueryUpdateRecords extends QueryRecords {
  Action: "Edit";
}

export interface QueryDeleteRecords extends QueryRecords {
  Action: "Delete";
}
