export interface NotionPagination {
  start_cursor?: string;
  page_size?: number;
}

export interface Page {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  cover: {
    type: string;
    external: {
      url: string;
    };
  };
  icon: {
    type: string;
    emoji: string;
  };
  properties: {
    [key: string]: any;
  };
  parent: {
    type: string;
    database_id: string;
  };
  archived: boolean;
  url: string;
  public_url: any;
}

export interface QueryProperties {
  filter_properties: string[];
}

export interface Pages {
  object: string;
  results: Page[];
  next_cursor: any;
  has_more: false;
  type: string;
  [key: string]: {}; //type value becomes the key name
}

export interface Block {
  object: string;
  results: Array<{
    object: string;
    id: string;
    parent: {
      type: string;
      block_id: string;
    };
    type: string;
    created_time: string;
    last_edited_time: string;
    created_by: {
      object: string;
      id: string;
    };
    last_edited_by: {
      object: string;
      id: string;
    };
    has_children: boolean;
    archived: boolean;
    [key: string]: {};
  }>;
  next_cursor: any;
  has_more: false;
  type: string;
  [key: string]: {}; //type value becomes the key name
}

interface UserBase {
  object: "user";
  id: string;
  type: "person" | "bot";
  name: string;
  avatar_url: string;
}

interface PersonUser extends UserBase {
  person: {
    email: string;
  };
}

interface BotUser extends UserBase {
  bot: {
    owner: {
      type: string;
      workspace: boolean;
    };
    workspace_name: string;
  };
}

export interface Users {
  results: Array<PersonUser | BotUser>;
  next_cursor: string;
  has_more: boolean;
}

export interface QueryDatabase extends NotionPagination {
  filter?: {
    property?: string;
    checkbox?: {};
    date?: {};
    files?: {};
    formula?: {};
    multi_select?: {};
    number?: {};
    people?: {};
    phone_number?: {};
    relation?: {};
    rich_text?: {};
    select?: {};
    status?: {};
    timestamp?: {};
  };
  sorts?: {
    property?: string;
    direction?: "ascending" | "descending";
  }[];
}
