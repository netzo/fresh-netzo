export interface Site {
  id: string;
  object: string;
  name: string;
  sharing: string;
  created_at: string;
}

export interface Sites {
  object: string;
  url: string;
  has_more: boolean;
  data: Array<Site>;
}

export interface QuerySites {
  limit?: number;
  starting_after?: string;
  ending_before?: string;
}

export interface QueryAddSite {
  name: string;
  sharing?: "none" | "private" | "public";
  share_password?: string;
}

export type QueryUpdateSite = Partial<QueryAddSite>;
