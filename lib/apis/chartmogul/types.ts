export interface Customer {
  id: number;
  uuid: string;
  external_id: string;
  external_ids: string[];
  data_source_uuid: string;
  data_source_uuids: string[];
  name: string;
  company: string;
  email: string;
  status: string;
  lead_created_at: string;
  free_trial_started_at: string;
  customer_since: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  attributes: {
    tags: string[];
    stripe: any;
    clearbit: any;
    custom: any;
  };
  address: {
    address_zip: string;
    city: string;
    country: string;
    state: string;
  };
  mrr: number;
  arr: number;
  "billing-system-url": string;
  "chartmogul-url": string;
  "billing-system-type": string;
  currency: string;
  "currency-sign": string;
}

export interface Customers {
  entries: Array<Customer>;
  has_more: boolean;
  per_page: number;
  page: number;
  current_page: number;
  total_pages: number;
}

export interface QueryCustomers {
  data_source_uuid?: string;
  external_id?: string;
  status?: "Lead" | "Active" | "Past_Due" | "Cancelled";
  system?: string;
  page?: number;
  per_page?: number;
}

export interface QueryAddCustomer {
  data_source_uuid: string;
  external_id: string;
  name?: string;
  email?: string;
  company?: string;
  country?: string;
  state?: string;
  city?: string;
  zip?: string;
  lead_created_at?: string;
  free_trial_started_at?: string;
  owner?: string;
  attributes?: {
    tags?: Array<string>;
    custom?: Array<{
      type: string;
      key: string;
      value: string;
      source?: string;
    }>;
  };
  primary_contact?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    title?: string;
    phone?: string;
    linked_in?: string;
    twitter?: string;
    notes?: string;
  };
}

export interface AddOrUpdateCustomerResponse {
  id: number;
  uuid: string;
  external_id: string;
  name: string;
  email: string;
  status: string;
  "customer-since": any;
  attributes: {
    custom: {
      [key: string]: any;
    };
    clearbit: {};
    stripe: {};
    tags: Array<string>;
  };
  data_source_uuid: string;
  data_source_uuids: Array<string>;
  external_ids: Array<string>;
  company: string;
  country: string;
  state: any;
  city: string;
  zip: any;
  lead_created_at: string;
  free_trial_started_at: string;
  address: {
    country: string;
    state: any;
    city: string;
    address_zip: any;
  };
  mrr: number;
  arr: number;
  "billing-system-url": any;
  "chartmogul-url": string;
  "billing-system-type": string;
  currency: string;
  "currency-sign": string;
  owner: string;
}

export type QueryUpdateCustomer = Omit<
  QueryAddCustomer,
  | "data_source_uuid"
  | "external_id"
>;

export interface CustomerSubscriptions {
  customer_uuid: string;
  subscriptions: Array<{
    uuid: string;
    external_id: string;
    subscription_set_external_id: string;
    plan_uuid: string;
    data_source_uuid: string;
    cancellation_dates: Array<any>;
  }>;
  current_page: number;
  total_pages: number;
}

export interface QueryCustomerSubscriptions {
  page?: number;
  per_page?: number;
}

export interface Invoice {
  uuid: string;
  customer_uuid: string;
  external_id: string;
  date: string;
  due_date: string;
  currency: string;
  line_items: Array<{
    uuid: string;
    external_id: any;
    type: string;
    subscription_uuid?: string;
    subscription_external_id?: string;
    subscription_set_external_id?: string;
    plan_uuid?: string;
    prorated?: boolean;
    service_period_start?: string;
    service_period_end?: string;
    amount_in_cents: number;
    quantity: number;
    discount_code: string;
    discount_amount_in_cents: number;
    tax_amount_in_cents: number;
    transaction_fees_in_cents: number;
    transaction_fees_currency: string;
    discount_description: string;
    event_order?: number;
    account_code: any;
    description?: string;
  }>;
  transactions: Array<{
    uuid: string;
    external_id: any;
    type: string;
    date: string;
    result: string;
  }>;
}

export interface CustomerInvoices {
  customer_uuid: string;
  invoices: Array<Omit<Invoice, "customer_uuid">>;
}

export interface QueryCustomerInvoices {
  page?: number;
  per_page?: number;
  validation_type?: "valid" | "invalid" | "all";
}

export interface Invoices {
  invoices: Array<Invoice>;
  current_page: number;
  total_pages: number;
}

export interface QueryInvoices extends QueryCustomerInvoices {
  data_source_uuid?: string;
  customer_uuid?: string;
  external_id?: string;
}

export type QueryInvoice = Pick<QueryCustomerInvoices, "validation_type">;
