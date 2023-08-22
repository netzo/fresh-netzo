export interface Document {
  id: string;
  name: string;
  autonumbering_sequence_name_prefix: string;
  date_created: string;
  date_modified: string;
  date_completed: string;
  created_by: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  template: {
    id: string;
    name: string;
  };
  expiration_date: any;
  metadata: {
    document__created_via_public_api: string;
    my_favorite_pet: string;
    opp_id: string;
  };
  tokens: Array<{
    name: string;
    value: string;
  }>;
  fields: Array<{
    uuid: string;
    field_id: string;
    name: string;
    merge_field?: string;
    title: string;
    placeholder?: string;
    type: string;
    assigned_to: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      recipient_type: string;
      has_completed: boolean;
      role: string;
      type: string;
    };
    value: any;
  }>;
  pricing: {
    tables: Array<{
      id: string;
      name: string;
      total: string;
      is_included_in_total: boolean;
      summary: {
        subtotal: string;
        total: string;
        discount: string;
        tax: string;
      };
      items: Array<{
        id: any;
        sku: any;
        qty: number;
        name: string;
        cost: string;
        price: string;
        description: string;
        custom_fields: {
          Fluffiness: string;
        };
        custom_columns: {
          Fluffiness: string;
        };
        discount: any;
        tax_first: {
          value: string;
          type: string;
        };
        tax_second: any;
        subtotal: string;
        options: {
          optional: boolean;
          optional_selected: boolean;
        };
        sale_price: string;
      }>;
      currency: string;
      columns: Array<{
        header?: string;
        name: string;
        merge_name?: string;
        hidden: boolean;
      }>;
    }>;
    total: string;
  };
  tags: Array<any>;
  status: string;
  recipients: Array<{
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    recipient_type: string;
    has_completed: boolean;
    role: string;
    signing_order: number;
    shared_link: string;
  }>;
  sent_by: any;
  grand_total: {
    amount: string;
    currency: string;
  };
  linked_objects: Array<{
    provider: string;
    entity_type: string;
    entity_id: string;
  }>;
  version: string;
  approval_execution: {
    next_step: string;
    steps: Array<{
      id: string;
      assignee: any;
      group: {
        id: string;
        name: string;
        type: string;
        assignees: Array<{
          id: string;
          user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            avatar: any;
          };
          is_selected: boolean;
        }>;
      };
      conditions: Array<{
        relation: string;
        type: string;
        value: number;
        kind: any;
      }>;
      approve_user: any;
      approve_message: any;
      reject_user: any;
      reject_message: any;
      is_skipped: boolean;
      skip_reason: any;
    }>;
    sender: any;
    sender_message: any;
    skip_user: any;
    skip_message: any;
    is_completed: boolean;
    is_editing_allowed: boolean;
    is_ordering_enabled: boolean;
  };
}

export interface Documents {
  results: Array<{
    id: string;
    name: string;
    status: string;
    date_created: string;
    date_modified: string;
    expiration_date: any;
    version: string;
  }>;
}

export interface QueryDocuments {
  q?: string;
  tag?: string;
  status?: number;
  count?: number;
  page?: number;
  metadata?: string;
  deleted?: boolean;
  id?: string;
  template_id?: string;
  folder_uuid?: string;
  form_id?: string;
  order_by?: string;
  created_from?: string;
  created_to?: string;
  modified_from?: string;
  modified_to?: string;
  completed_from?: string;
  completed_to?: string;
  membership_id?: string;
  contact_id?: string;
}

export interface QueryUpdateDocument {
  recipients?: Array<{
    email?: string;
    first_name?: string;
    last_name?: string;
    role?: string;
    default?: boolean;
    ID?: string;
  }>;
  tokens?: Array<{
    name?: string;
    value?: string;
  }>;
  fields?: Array<{
    value?: string;
    role?: string;
  }>;
  pricing_tables?: Array<{
    name?: string;
    sections?: string;
  }>;
}

export interface QueryAddContact {
  email: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  job_title?: string;
  phone?: string;
  country?: string;
  state?: string;
  street_address?: string;
  city?: string;
  postal_code?: string;
}

export interface Contact extends QueryAddContact {
  id: string;
}

export interface Contacts {
  results: Array<Contact>;
}
