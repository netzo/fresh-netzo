interface RecordObject {
  fields: {
    [key: string]: any;
  };
  id?: string;
}

export interface Record extends RecordObject {
  createdTime: string;
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

export interface QueryDeleteRecords {
  records: string[];
}

export interface RecordDeleted {
  deleted: boolean;
  id: string;
}
