interface RecordObject {
    id: string;
    fields: {
      [key: string]: any;
    };
  }

export interface Record extends RecordObject {
  createdTime: string;
}

export interface QueryRecords {
  pageSize?: number;
  maxRecords?: number;
  offset?: string;
  view?: string; //Complex
  sort?: {
    field?: string;
    direction?: "asc" | "desc";
  };
  filterByFormula?: string;
  fields?: string[];
  returnFieldsByFieldId?: boolean;
  //cellFormat ??
  //recordMetaData ??
}

export interface QueryAddRecords {
  records: Pick<RecordObject, "fields">[];
  returnFieldsByFieldId?: boolean;
  typecast?: boolean;
}

export interface QueryUpdateRecords {
  records: RecordObject[];
  returnFieldsByFieldId?: boolean;
  typecast?: boolean;
}

export interface QueryDeleteRecords {
    records: string[]  //string of ids
}

export interface RecordDeleted {
  deleted: boolean;
  id: string;
}
