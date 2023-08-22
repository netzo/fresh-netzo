export interface File {
  id: string;
  object: string;
  bytes: number;
  created_at: number;
  filename: string;
  purpose: string;
  status: string;
  status_details: any;
}

export interface Files {
  data: Array<File>;
  object: string;
}

export interface UploadFileRequest {
  file: string; //Name of the JSON Lines file to be uploaded.
  purpose: string;
}
