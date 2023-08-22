export interface QueryUpdateList {
  name: string;
}

export interface UpdateListResponse {
  id: string;
  name: string;
  contact_count: number;
  _metadata: {
    self: string;
  };
}

export interface List {
  id: string;
  name: string;
  contact_count: number;
  _metadata: {
    self: string;
  };
  contact_sample: {
    id: string;
    first_name: string;
    last_name: string;
    unique_name: string;
    email: string;
    alternate_emails: Array<string>;
    address_line_1: string;
    address_line_2: string;
    city: string;
    state_province_region: string;
    country: string;
    postal_code: string;
    phone_number: string;
    whatsapp: string;
    line: string;
    facebook: string;
    list_ids: Array<string>;
    segment_ids: Array<string>;
    custom_fields: {
      created_at: string;
      updated_at: string;
      _metadata: {
        self: string;
      };
    };
  };
}

export interface Lists {
  result: Array<UpdateListResponse>;
  _metadata: {
    prev: string;
    self: string;
    next: string;
    count: string;
  };
}

export interface QueryLists {
  page_size?: number;
  page_token?: string;
}

export interface QueryList {
  contact_sample?: boolean;
}

export interface QueryAddContacts {
  list_ids: Array<string>;
  contacts: Array<{
    email: string;
    first_name?: string;
    last_name?: string;
    alternate_emails?: Array<string>;
    address_line_1?: string;
    address_line_2?: string;
    city?: string;
    state_province_region?: string;
    country?: string;
    postal_code?: string;
    custom_fields?: {};
  }>;
}

export interface AddContactsResponse {
  job_id: string;
}

export interface QuerySendEmail {
  personalizations: Array<{
    to: Array<{
      email: string;
      name?: string;
    }>;
    cc?: Array<{
      email?: string;
      name?: string;
    }>;
    bcc?: Array<{
      email?: string;
      name?: string;
    }>;
    from?: {
      email?: string;
      name?: string;
    };
    subject?: string;
    headers?: {};
    substitutions?: {};
    dynamic_template_data?: {};
    custom_args?: {};
    send_at?: number;
  }>;
  from: {
    email: string;
    name?: string;
  };
  reply_to?: {
    email?: string;
    name?: string;
  };
  subject: string;
  content: Array<{
    type: string;
    value: string;
  }>;
  attachments?: Array<{
    content?: string;
    filename?: string;
    type?: string;
    disposition?: string;
  }>;
  categories?: Array<string>;
  send_at?: number;
  batch_id?: string;
  asm?: {
    group_id?: number;
    groups_to_display?: Array<number>;
  };
  ip_pool_name?: string;
  mail_settings?: {
    bypass_list_management?: {
      enable?: boolean;
    };
    footer?: {
      enable?: boolean;
    };
    sandbox_mode?: {
      enable?: boolean;
    };
  };
  tracking_settings?: {
    click_tracking?: {
      enable?: boolean;
      enable_text?: boolean;
    };
    open_tracking?: {
      enable?: boolean;
      substitution_tag?: string;
    };
    subscription_tracking?: {
      enable?: boolean;
    };
  };
}
