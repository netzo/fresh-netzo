interface StripePagination {
  limit?: number;
  ending_before?: string; //for pagination: ending_before is an object ID that defines your place in the list.
  starting_after?: string; //for pagination: starting_after is an object ID that defines your place in the list.
}

export interface SubscriptionItem {
  id: string;
  object: string;
  billing_thresholds: any;
  created: number;
  metadata: {};
  price: {
    id: string;
    object: string;
    active: boolean;
    billing_scheme: string;
    created: number;
    currency: string;
    custom_unit_amount: any;
    livemode: boolean;
    lookup_key: any;
    metadata: {};
    nickname: any;
    product: string;
    recurring: {
      aggregate_usage: any;
      interval: string;
      interval_count: number;
      usage_type: string;
    };
    tax_behavior: string;
    tiers_mode: any;
    transform_quantity: any;
    type: string;
    unit_amount: number;
    unit_amount_decimal: string;
  };
  quantity: number;
  subscription: string;
  tax_rates: Array<any>;
}

export interface QuerySubscriptions extends StripePagination {
  customer?: string;
  price?: string;
  status?:
    | "active"
    | "past_due"
    | "unpaid"
    | "canceled"
    | "incomplete"
    | "incomplete_expired"
    | "trialing"
    | "paused"
    | "all"
    | "ended";
  collection_method?: "charge_automatically" | "send_invoice";
  created?: string | number;
  current_period_end?: string | number;
  current_period_start?: string | number;
}

export interface Subscription {
  id: string;
  object: string;
  application: any;
  application_fee_percent: any;
  automatic_tax: {
    enabled: boolean;
  };
  billing_cycle_anchor: number;
  billing_thresholds: any;
  cancel_at: any;
  cancel_at_period_end: boolean;
  canceled_at: number;
  cancellation_details: {
    comment: any;
    feedback: any;
    reason: string;
  };
  collection_method: string;
  created: number;
  currency: string;
  current_period_end: number;
  current_period_start: number;
  customer: string;
  days_until_due: any;
  default_payment_method: string;
  default_source: any;
  default_tax_rates: Array<any>;
  description: any;
  discount: any;
  ended_at: number;
  items: {
    object: string;
    data: SubscriptionItem[];
    has_more: boolean;
    url: string;
  };
  latest_invoice: string;
  livemode: boolean;
  metadata: {
    OrgStoreId: string;
    OrgDeviceId: string;
    Vehicles: string;
    CustomerId: string;
    OrgOrderId: string;
  };
  next_pending_invoice_item_invoice: any;
  on_behalf_of: any;
  pause_collection: any;
  payment_settings: {
    payment_method_options: any;
    payment_method_types: any;
    save_default_payment_method: string;
  };
  pending_invoice_item_interval: any;
  pending_setup_intent: any;
  pending_update: any;
  schedule: any;
  start_date: number;
  status: string;
  test_clock: any;
  transfer_data: any;
  trial_end: any;
  trial_settings: {
    end_behavior: {
      missing_payment_method: string;
    };
  };
  trial_start: any;
}

export interface QuerySubscriptionItems extends StripePagination {
  subscription: string; //id - required
}

export interface Customer {
  "id": "cus_9s6XKzkNRiz8i3";
  "object": "customer";
  "address": null;
  "balance": 0;
  "created": 1483565364;
  "currency": "usd";
  "default_source": "card_1NPfgj2eZvKYlo2CyDrD1yJ4";
  "delinquent": false;
  "description": "Casetabs Organization";
  "discount": null;
  "email": null;
  "invoice_prefix": "28278FC";
  "invoice_settings": {
    "custom_fields": null;
    "default_payment_method": null;
    "footer": null;
    "rendering_options": null;
  };
  "livemode": false;
  "metadata": {
    "order_id": "6735";
  };
  "name": null;
  "next_invoice_sequence": 40;
  "phone": null;
  "preferred_locales": [];
  "shipping": null;
  "tax_exempt": "none";
  "test_clock": null;
}

export interface QueryCustomers extends StripePagination {
  email?: string;
  created?: string | number;
}

export interface Invoice {
  id: string;
  object: string;
  account_country: string;
  account_name: string;
  account_tax_ids: any;
  amount_due: number;
  amount_paid: number;
  amount_remaining: number;
  amount_shipping: number;
  application: any;
  application_fee_amount: any;
  attempt_count: number;
  attempted: boolean;
  auto_advance: boolean;
  automatic_tax: {
    enabled: boolean;
    status: any;
  };
  billing_reason: string;
  charge: any;
  collection_method: string;
  created: number;
  currency: string;
  custom_fields: any;
  customer: string;
  customer_address: any;
  customer_email: any;
  customer_name: any;
  customer_phone: any;
  customer_shipping: any;
  customer_tax_exempt: string;
  customer_tax_ids: Array<any>;
  default_payment_method: any;
  default_source: any;
  default_tax_rates: Array<any>;
  description: any;
  discount: any;
  discounts: Array<any>;
  due_date: any;
  effective_at: any;
  ending_balance: any;
  footer: any;
  from_invoice: any;
  hosted_invoice_url: any;
  invoice_pdf: any;
  last_finalization_error: any;
  latest_revision: any;
  lines: {
    object: string;
    data: Array<{
      id: string;
      object: string;
      amount: number;
      amount_excluding_tax: number;
      currency: string;
      description: string;
      discount_amounts: Array<any>;
      discountable: boolean;
      discounts: Array<any>;
      invoice_item: string;
      livemode: boolean;
      metadata: {};
      period: {
        end: number;
        start: number;
      };
      price: {
        id: string;
        object: string;
        active: boolean;
        billing_scheme: string;
        created: number;
        currency: string;
        custom_unit_amount: any;
        livemode: boolean;
        lookup_key: any;
        metadata: {};
        nickname: any;
        product: string;
        recurring: any;
        tax_behavior: string;
        tiers_mode: any;
        transform_quantity: any;
        type: string;
        unit_amount: number;
        unit_amount_decimal: string;
      };
      proration: boolean;
      proration_details: {
        credited_items: any;
      };
      quantity: number;
      subscription: any;
      tax_amounts: Array<any>;
      tax_rates: Array<any>;
      type: string;
      unit_amount_excluding_tax: string;
    }>;
    has_more: boolean;
    url: string;
  };
  livemode: boolean;
  metadata: {};
  next_payment_attempt: any;
  number: any;
  on_behalf_of: any;
  paid: boolean;
  paid_out_of_band: boolean;
  payment_intent: any;
  payment_settings: {
    default_mandate: any;
    payment_method_options: any;
    payment_method_types: any;
  };
  period_end: number;
  period_start: number;
  post_payment_credit_notes_amount: number;
  pre_payment_credit_notes_amount: number;
  quote: any;
  receipt_number: any;
  redaction: any;
  rendering_options: any;
  shipping_cost: any;
  shipping_details: any;
  starting_balance: number;
  statement_descriptor: any;
  status: string;
  status_transitions: {
    finalized_at: any;
    marked_uncollectible_at: any;
    paid_at: any;
    voided_at: any;
  };
  subscription: any;
  subtotal: number;
  subtotal_excluding_tax: number;
  tax: any;
  test_clock: any;
  total: number;
  total_discount_amounts: Array<any>;
  total_excluding_tax: number;
  total_tax_amounts: Array<any>;
  transfer_data: any;
  webhooks_delivered_at: any;
}

export interface QueryInvoices extends StripePagination {
  customer?: string;
  status?: "draft" | "open" | "void" | "paid" | "uncollectible";
  subscription?: string;
  collection_method?: "charge_automatically" | "send_invoice";
  created?: string | number;
  due_date?: string | number;
}

export interface Charge {
  id: string;
  object: string;
  amount: number;
  amount_captured: number;
  amount_refunded: number;
  application: any;
  application_fee: any;
  application_fee_amount: any;
  balance_transaction: string;
  billing_details: {
    address: {
      city: any;
      country: any;
      line1: any;
      line2: any;
      postal_code: any;
      state: any;
    };
    email: any;
    name: any;
    phone: any;
  };
  calculated_statement_descriptor: any;
  captured: boolean;
  created: number;
  currency: string;
  customer: any;
  description: any;
  disputed: boolean;
  failure_balance_transaction: any;
  failure_code: string;
  failure_message: string;
  fraud_details: {};
  invoice: any;
  livemode: boolean;
  metadata: {
    order_id: string;
  };
  on_behalf_of: any;
  outcome: {
    network_status: any;
    reason: string;
    risk_level: string;
    seller_message: string;
    type: string;
  };
  paid: boolean;
  payment_intent: any;
  payment_method: string;
  payment_method_details: {
    card: {
      brand: string;
      checks: {
        address_line1_check: any;
        address_postal_code_check: any;
        cvc_check: string;
      };
      country: string;
      exp_month: number;
      exp_year: number;
      fingerprint: string;
      funding: string;
      installments: any;
      last4: string;
      mandate: any;
      moto: any;
      network: string;
      network_token: {
        used: boolean;
      };
      three_d_secure: any;
      wallet: any;
    };
    type: string;
  };
  receipt_email: string;
  receipt_number: any;
  receipt_url: any;
  redaction: any;
  refunded: boolean;
  refunds: {
    object: string;
    data: Array<any>;
    has_more: boolean;
    url: string;
  };
  review: any;
  shipping: any;
  source_transfer: any;
  statement_descriptor: any;
  statement_descriptor_suffix: any;
  status: string;
  transfer_data: any;
  transfer_group: any;
}

export interface QueryCharges extends StripePagination {
  customer?: string;
  created?: string | number;
  payment_intent?: string;
  transfer_group?: string; //This argument is only relevant if you're using Stripe Connect
}

export interface Plan {
  id: string;
  object: string;
  active: boolean;
  aggregate_usage: any;
  amount: number;
  amount_decimal: string;
  billing_scheme: string;
  created: number;
  currency: string;
  interval: string;
  interval_count: number;
  livemode: boolean;
  metadata: {};
  nickname: any;
  product: string;
  tiers_mode: any;
  transform_usage: any;
  trial_period_days: any;
  usage_type: string;
}

export interface QueryPlans extends StripePagination {
  active?: boolean;
  product?: string;
  created?: string | number;
}

type TransactionType =
  | "adjustment"
  | "advance"
  | "advance_funding"
  | "anticipation_repayment"
  | "application_fee"
  | "application_fee_refund"
  | "charge"
  | "connect_collection_transfer"
  | "contribution"
  | "issuing_authorization_hold"
  | "issuing_authorization_release"
  | "issuing_dispute"
  | "issuing_transaction"
  | "payment"
  | "payment_failure_refund"
  | "payment_refund"
  | "payout"
  | "payout_cancel"
  | "payout_failure"
  | "refund"
  | "refund_failure"
  | "reserve_transaction"
  | "reserved_funds"
  | "stripe_fee"
  | "stripe_fx_fee"
  | "tax_fee"
  | "topup"
  | "topup_reversal"
  | "transfer"
  | "transfer_cancel"
  | "transfer_failure"
  | "transfer_refund";

export interface Transaction {
  id: string;
  object: string;
  amount: number;
  available_on: number;
  created: number;
  currency: string;
  description: string;
  exchange_rate: any;
  fee: number;
  fee_details: Array<{
    amount: number;
    application: any;
    currency: string;
    description: string;
    type: string;
  }>;
  net: number;
  reporting_category: string;
  source: string;
  status: string;
  type: TransactionType
}

export interface QueryTransactions extends StripePagination {
  payout?: string;
  type?: TransactionType
  created?: string | number;
  currency?: string;
  source?: string;
}
