interface RecordObject {
  fields: {
    [key: string]: any;
  };
  id?: string;
}

export interface Records {
  records: Array<
    RecordObject & {
      createdTime: string;
    }
  >;
}

export interface QueryRecords {
  timeZone?: {};
  userLocale?: string;
  pageSize?: number;
  maxRecords?: number;
  offset?: string;
  view?: string;
  sort?: {
    field?: string;
    direction?: "asc" | "desc";
  }[];
  filterByFormula?: string;
  cellFormat?: "json" | "string";
  fields?: string[];
  returnFieldsByFieldId?: boolean;
  recordMetaData?: string[];
}

export interface QueryAddRecords {
  records: Pick<RecordObject, "fields">[];
  returnFieldsByFieldId?: boolean;
  typecast?: boolean;
}

export interface QueryUpdateRecords {
  records: RecordObject[];
  performUpsert?: { fieldsToMergeOn: string[] };
  returnFieldsByFieldId?: boolean;
  typecast?: boolean;
}

export interface UpdateRecordsResponse {
  createdRecords: string[];
  records: RecordObject[];
  updatedRecords: string[];
}

export interface QueryDeleteRecords {
  records: string[];
}

export interface RecordsDeleted {
  records: Array<{
    deleted: boolean;
    id: string;
  }>;
}
