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

export interface Database extends Page {
  title: string;
  description: string;
  is_inline: boolean;
}

export interface Block {
  object: string
  id: string
  parent: {
    type: string
    block_id: string
  }
  type: string
  created_time: string
  last_edited_time: string
  created_by: {
    object: string
    id: string
  }
  last_edited_by: {
    object: string
    id: string
  }
  has_children: boolean
  archived: boolean
  [key: string]: {}  //property name is the value of property "type"
}

interface User {
  object: "user";
  id: string;
  type: "person" | "bot";
  name: string;
  avatar_url: string;
}

export interface PersonUser extends User {
  person: {
    email: string;
  };
}

export interface BotUser extends User {
  bot: {
    owner: {
      type: string;
      workspace: boolean;
    };
    workspace_name: string;
  };
}

export interface QuerySearch extends NotionPagination {
  query?: string;
  sort?: {
    timestamp?: "last_edited_time";
    direction?: "ascending" | "descending";
  };
  filter?: {
    value?: "page" | "database";
    property?: "object";
  };
}

export interface QueryDbBody extends NotionPagination {
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
