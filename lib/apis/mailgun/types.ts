interface MailingListBase {
  access_level: string;
  address: string;
  created_at: string;
  description: string;
  members_count: number;
  name: string;
}

export interface MailingLists {
  items: Array<MailingListBase>;
  paging: {
    first: string;
    last: string;
    next: string;
    previous: string;
  };
}

export interface QueryMailingLists {
  limit?: number;
}

export interface QueryAddMailingList {
  address: string;
  name?: string;
  description?: string;
  access_level?: "readonly" | "members" | "everyone";
  reply_preference?: "list" | "sender";
}

export type QueryUpdateMailingList = Partial<QueryAddMailingList>;

export interface AddOrUpdateListResponse {
  message: string;
  list: MailingListBase;
}

export interface QueryAddMember {
  address: string;
  name?: string;
  vars?: {
    [key: string]: any;
  };
  subscribed?: "yes" | "no";
  upsert?: "yes" | "no";
}

export interface AddMemberResponse {
  member: {
    vars: {
      [key: string]: any;
    };
    name: string;
    subscribed: boolean;
    address: string;
  };
  message: string;
}

export interface DeleteMemberResponse {
  member: {
    address: string;
  };
  message: string;
}
