export interface Record {
  [key: string]: any;
}

export interface AddOrUpdateRecordResponse {
  [key: string]: any;
  _id: string;
  _created: string;
  _changed: string;
  _createdby: string;
  _changedby: string;
}

export interface DeleteRecordResponse {
  result: Array<string>;
}
