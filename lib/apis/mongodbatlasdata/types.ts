export interface QueryDocuments {
  dataSource: string;
  database: string;
  collection: string;
  filter: {
    text?: string;
  };
  projection?: {
    status?: number;
    text?: number;
  };
  sort?: {};
  limit?: number;
  skip?: number;
}

interface DocumentBase {
  _id: string;
  status: string;
  text: string;
}

export interface Documents {
  documents: Array<DocumentBase>;
}

export interface QueryAddDocument {
  dataSource: string;
  database: string;
  collection: string;
  document: {};
}

export interface AddDocumentResponse {
  insertedId: string;
}

export interface QueryUpdateDocument {
  dataSource: string;
  database: string;
  collection: string;
  filter: {};
  update: {};
  upsert?: boolean;
}

export interface UpdateDocumentResponse {
  "matchedCount": number;
  "modifiedCount": number;
}
