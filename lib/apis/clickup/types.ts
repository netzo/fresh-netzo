export interface List {
  id: string;
  name: string;
  orderindex: number;
  content: string;
  status: {
    status: string;
    color: string;
    hide_label: boolean;
  };
  priority: {
    priority: string;
    color: string;
  };
  assignee: any;
  due_date: string;
  due_date_time: boolean;
  start_date: any;
  start_date_time: any;
  folder: {
    id: string;
    name: string;
    hidden: boolean;
    access: boolean;
  };
  space: {
    id: string;
    name: string;
    access: boolean;
  };
  inbound_address: string;
  archived: boolean;
  override_statuses: boolean;
  statuses: Array<{
    status: string;
    orderindex: number;
    color: string;
    type: string;
  }>;
  permission_level: string;
}

export interface Lists {
  lists: Array<List>;
}

export interface QueryLists {
  archived?: boolean;
}

export interface Task {
  id: string;
  custom_id: string;
  name: string;
  text_content: string;
  description: string;
  status: {
    status: string;
    color: string;
    orderindex: number;
    type: string;
  };
  orderindex: string;
  date_created: string;
  date_updated: string;
  date_closed: string;
  creator: {
    id: number;
    username: string;
    color: string;
    profilePicture: string;
  };
  assignees: Array<string>;
  checklists: Array<string>;
  tags: Array<string>;
  parent: string;
  priority: string;
  due_date: string;
  start_date: string;
  time_estimate: string;
  time_spent: string;
  custom_fields: Array<{}>;
  list: {
    id: string;
  };
  folder: {
    id: string;
  };
  space: {
    id: string;
  };
  url: string;
}

export interface Tasks {
  tasks: Array<Task>;
}

export interface QueryTasks {
  archived?: false;
  page?: number;
  order_by?: string;
  reverse?: true;
  subtasks?: true;
  statuses?: Array<string>;
  include_closed?: true;
  assignees?: Array<string>;
  tags?: Array<string>;
  due_date_gt?: number;
  due_date_lt?: number;
  date_created_gt?: number;
  date_created_lt?: number;
  date_updated_gt?: number;
  date_updated_lt?: number;
  date_done_gt?: number;
  date_done_lt?: number;
  custom_fields?: Array<string>;
}

export interface QueryAddTask {
  name: string;
  description?: string;
  assignees?: Array<number>;
  tags?: Array<string>;
  status?: string;
  priority?: number;
  due_date?: number;
  due_date_time?: boolean;
  time_estimate?: number;
  start_date?: number;
  start_date_time?: boolean;
  notify_all?: boolean;
  parent?: any;
  links_to?: any;
  check_required_custom_fields?: boolean;
  custom_fields?: Array<{
    id: string;
    value: string;
  }>;
}

export interface QueryUpdateTask {
  name?: string;
  description?: string;
  status?: string;
  priority?: number;
  due_date?: number;
  due_date_time?: boolean;
  parent?: string;
  time_estimate?: number;
  start_date?: number;
  start_date_time?: boolean;
  assignees?: {
    add: Array<any>;
    rem: Array<any>;
  };
  archived?: boolean;
}
