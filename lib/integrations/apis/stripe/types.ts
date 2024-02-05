import { z } from "../../../deps/zod/mod.ts";

const stripePaginationSchema = z.object({
  limit: z.number().optional(),
  ending_before: z.string().optional(),
  starting_after: z.string().optional(),
});

export const subscriptionItemsSchema = z.object({
  object: z.string(),
  url: z.string(),
  has_more: z.boolean(),
  data: z.array(
    z.object({
      id: z.string(),
      object: z.string(),
      billing_thresholds: z.any(),
      created: z.number(),
      metadata: z.object({}),
      price: z.object({
        id: z.string(),
        object: z.string(),
        active: z.boolean(),
        billing_scheme: z.string(),
        created: z.number(),
        currency: z.string(),
        custom_unit_amount: z.any(),
        livemode: z.boolean(),
        lookup_key: z.any(),
        metadata: z.object({}),
        nickname: z.any(),
        product: z.string(),
        recurring: z.object({
          aggregate_usage: z.any(),
          interval: z.string(),
          interval_count: z.number(),
          usage_type: z.string(),
        }),
        tax_behavior: z.string(),
        tiers_mode: z.any(),
        transform_quantity: z.any(),
        type: z.string(),
        unit_amount: z.number(),
        unit_amount_decimal: z.string(),
      }),
      quantity: z.number(),
      subscription: z.string(),
      tax_rates: z.array(z.any()),
    }),
  ),
}).deepPartial();

export const subscriptionsSchema = z.object({
  object: z.string(),
  url: z.string(),
  has_more: z.boolean(),
  data: z.array(
    z.object({
      id: z.string(),
      object: z.string(),
      application: z.any(),
      application_fee_percent: z.any(),
      automatic_tax: z.object({
        enabled: z.boolean(),
      }),
      billing_cycle_anchor: z.number(),
      billing_thresholds: z.any(),
      cancel_at: z.any(),
      cancel_at_period_end: z.boolean(),
      canceled_at: z.any(),
      cancellation_details: z.object({
        comment: z.any(),
        feedback: z.any(),
        reason: z.any(),
      }),
      collection_method: z.string(),
      created: z.number(),
      currency: z.string(),
      current_period_end: z.number(),
      current_period_start: z.number(),
      customer: z.string(),
      days_until_due: z.any(),
      default_payment_method: z.string(),
      default_source: z.any(),
      default_tax_rates: z.array(z.any()),
      description: z.any(),
      discount: z.any(),
      ended_at: z.any(),
      items: z.object({
        object: z.string(),
        data: z.array(
          z.object({
            id: z.string(),
            object: z.string(),
            billing_thresholds: z.any(),
            created: z.number(),
            metadata: z.object({}),
            price: z.object({
              id: z.string(),
              object: z.string(),
              active: z.boolean(),
              billing_scheme: z.string(),
              created: z.number(),
              currency: z.string(),
              custom_unit_amount: z.any(),
              livemode: z.boolean(),
              lookup_key: z.any(),
              metadata: z.object({}),
              nickname: z.any(),
              product: z.string(),
              recurring: z.object({
                aggregate_usage: z.any(),
                interval: z.string(),
                interval_count: z.number(),
                usage_type: z.string(),
              }),
              tax_behavior: z.string(),
              tiers_mode: z.any(),
              transform_quantity: z.any(),
              type: z.string(),
              unit_amount: z.number(),
              unit_amount_decimal: z.string(),
            }),
            quantity: z.number(),
            subscription: z.string(),
            tax_rates: z.array(z.any()),
          }),
        ),
        has_more: z.boolean(),
        url: z.string(),
      }),
      latest_invoice: z.string(),
      livemode: z.boolean(),
      metadata: z.object({}),
      next_pending_invoice_item_invoice: z.any(),
      on_behalf_of: z.any(),
      pause_collection: z.any(),
      payment_settings: z.object({
        payment_method_options: z.any(),
        payment_method_types: z.any(),
        save_default_payment_method: z.string(),
      }),
      pending_invoice_item_interval: z.any(),
      pending_setup_intent: z.any(),
      pending_update: z.any(),
      schedule: z.any(),
      start_date: z.number(),
      status: z.string(),
      test_clock: z.any(),
      transfer_data: z.any(),
      trial_end: z.any(),
      trial_settings: z.object({
        end_behavior: z.object({
          missing_payment_method: z.string(),
        }),
      }),
      trial_start: z.any(),
    }),
  ),
}).deepPartial();

export const querySubscriptionsSchema = stripePaginationSchema.extend({
  customer: z.string().optional(),
  price: z.string().optional(),
  status: z
    .union([
      z.literal("active"),
      z.literal("past_due"),
      z.literal("unpaid"),
      z.literal("canceled"),
      z.literal("incomplete"),
      z.literal("incomplete_expired"),
      z.literal("trialing"),
      z.literal("paused"),
      z.literal("all"),
      z.literal("ended"),
    ])
    .optional(),
  automatic_tax: z
    .object({
      enabled: z.boolean().optional(),
    })
    .optional(),
  collection_method: z
    .union([z.literal("charge_automatically"), z.literal("send_invoice")])
    .optional(),
  created: z.string().optional(),
  current_period_end: z.string().optional(),
  current_period_start: z.string().optional(),
  test_clock: z.string().optional(),
});

export const querySubscriptionItemsSchema = stripePaginationSchema.extend({
  subscription: z.string(),
});

export const customersSchema = z.object({
  url: z.string(),
  has_more: z.boolean(),
  data: z.array(
    z.object({
      id: z.string(),
      object: z.string(),
      address: z.any(),
      balance: z.number(),
      created: z.number(),
      currency: z.string(),
      default_source: z.string(),
      delinquent: z.boolean(),
      description: z.string(),
      discount: z.any(),
      email: z.any(),
      invoice_prefix: z.string(),
      invoice_settings: z.object({
        custom_fields: z.any(),
        default_payment_method: z.any(),
        footer: z.any(),
        rendering_options: z.any(),
      }),
      livemode: z.boolean(),
      metadata: z.object({
        order_id: z.string(),
      }),
      name: z.any(),
      next_invoice_sequence: z.number(),
      phone: z.any(),
      preferred_locales: z.array(z.any()),
      shipping: z.any(),
      tax_exempt: z.string(),
      test_clock: z.any(),
    }),
  ),
}).deepPartial();

export const queryCustomersSchema = stripePaginationSchema.extend({
  email: z.string().optional(),
  created: z.string().optional(),
  test_clock: z.string().optional(),
});

export const invoicesSchema = z.object({
  object: z.string(),
  url: z.string(),
  has_more: z.boolean(),
  data: z.array(
    z.object({
      id: z.string(),
      object: z.string(),
      account_country: z.string(),
      account_name: z.string(),
      account_tax_ids: z.any(),
      amount_due: z.number(),
      amount_paid: z.number(),
      amount_remaining: z.number(),
      amount_shipping: z.number(),
      application: z.any(),
      application_fee_amount: z.any(),
      attempt_count: z.number(),
      attempted: z.boolean(),
      auto_advance: z.boolean(),
      automatic_tax: z.object({
        enabled: z.boolean(),
        status: z.any(),
      }),
      billing_reason: z.string(),
      charge: z.any(),
      collection_method: z.string(),
      created: z.number(),
      currency: z.string(),
      custom_fields: z.any(),
      customer: z.string(),
      customer_address: z.any(),
      customer_email: z.any(),
      customer_name: z.any(),
      customer_phone: z.any(),
      customer_shipping: z.any(),
      customer_tax_exempt: z.string(),
      customer_tax_ids: z.array(z.any()),
      default_payment_method: z.any(),
      default_source: z.any(),
      default_tax_rates: z.array(z.any()),
      description: z.any(),
      discount: z.any(),
      discounts: z.array(z.any()),
      due_date: z.any(),
      effective_at: z.any(),
      ending_balance: z.any(),
      footer: z.any(),
      from_invoice: z.any(),
      hosted_invoice_url: z.any(),
      invoice_pdf: z.any(),
      last_finalization_error: z.any(),
      latest_revision: z.any(),
      lines: z.object({
        object: z.string(),
        data: z.array(
          z.object({
            id: z.string(),
            object: z.string(),
            amount: z.number(),
            amount_excluding_tax: z.number(),
            currency: z.string(),
            description: z.string(),
            discount_amounts: z.array(z.any()),
            discountable: z.boolean(),
            discounts: z.array(z.any()),
            invoice_item: z.string(),
            livemode: z.boolean(),
            metadata: z.object({}),
            period: z.object({
              end: z.number(),
              start: z.number(),
            }),
            price: z.object({
              id: z.string(),
              object: z.string(),
              active: z.boolean(),
              billing_scheme: z.string(),
              created: z.number(),
              currency: z.string(),
              custom_unit_amount: z.any(),
              livemode: z.boolean(),
              lookup_key: z.any(),
              metadata: z.object({}),
              nickname: z.any(),
              product: z.string(),
              recurring: z.any(),
              tax_behavior: z.string(),
              tiers_mode: z.any(),
              transform_quantity: z.any(),
              type: z.string(),
              unit_amount: z.number(),
              unit_amount_decimal: z.string(),
            }),
            proration: z.boolean(),
            proration_details: z.object({
              credited_items: z.any(),
            }),
            quantity: z.number(),
            subscription: z.any(),
            tax_amounts: z.array(z.any()),
            tax_rates: z.array(z.any()),
            type: z.string(),
            unit_amount_excluding_tax: z.string(),
          }),
        ),
        has_more: z.boolean(),
        url: z.string(),
      }),
      livemode: z.boolean(),
      metadata: z.object({}),
      next_payment_attempt: z.any(),
      number: z.any(),
      on_behalf_of: z.any(),
      paid: z.boolean(),
      paid_out_of_band: z.boolean(),
      payment_intent: z.any(),
      payment_settings: z.object({
        default_mandate: z.any(),
        payment_method_options: z.any(),
        payment_method_types: z.any(),
      }),
      period_end: z.number(),
      period_start: z.number(),
      post_payment_credit_notes_amount: z.number(),
      pre_payment_credit_notes_amount: z.number(),
      quote: z.any(),
      receipt_number: z.any(),
      redaction: z.any(),
      rendering_options: z.any(),
      shipping_cost: z.any(),
      shipping_details: z.any(),
      starting_balance: z.number(),
      statement_descriptor: z.any(),
      status: z.string(),
      status_transitions: z.object({
        finalized_at: z.any(),
        marked_uncollectible_at: z.any(),
        paid_at: z.any(),
        voided_at: z.any(),
      }),
      subscription: z.any(),
      subtotal: z.number(),
      subtotal_excluding_tax: z.number(),
      tax: z.any(),
      test_clock: z.any(),
      total: z.number(),
      total_discount_amounts: z.array(z.any()),
      total_excluding_tax: z.number(),
      total_tax_amounts: z.array(z.any()),
      transfer_data: z.any(),
      webhooks_delivered_at: z.any(),
    }),
  ),
}).deepPartial();

export const queryInvoicesSchema = stripePaginationSchema.extend({
  customer: z.string().optional(),
  status: z
    .union([
      z.literal("draft"),
      z.literal("open"),
      z.literal("void"),
      z.literal("paid"),
      z.literal("uncollectible"),
    ])
    .optional(),
  subscription: z.string().optional(),
  collection_method: z
    .union([z.literal("charge_automatically"), z.literal("send_invoice")])
    .optional(),
  created: z.string().optional(),
  due_date: z.string().optional(),
});

export const chargesSchema = z.object({
  object: z.string(),
  url: z.string(),
  has_more: z.boolean(),
  data: z.array(
    z.object({
      id: z.string(),
      object: z.string(),
      amount: z.number(),
      amount_captured: z.number(),
      amount_refunded: z.number(),
      application: z.any(),
      application_fee: z.any(),
      application_fee_amount: z.any(),
      balance_transaction: z.string(),
      billing_details: z.object({
        address: z.object({
          city: z.any(),
          country: z.any(),
          line1: z.any(),
          line2: z.any(),
          postal_code: z.any(),
          state: z.any(),
        }),
        email: z.any(),
        name: z.any(),
        phone: z.any(),
      }),
      calculated_statement_descriptor: z.any(),
      captured: z.boolean(),
      created: z.number(),
      currency: z.string(),
      customer: z.any(),
      description: z.any(),
      disputed: z.boolean(),
      failure_balance_transaction: z.any(),
      failure_code: z.string(),
      failure_message: z.string(),
      fraud_details: z.object({}),
      invoice: z.any(),
      livemode: z.boolean(),
      metadata: z.object({
        order_id: z.string(),
      }),
      on_behalf_of: z.any(),
      outcome: z.object({
        network_status: z.any(),
        reason: z.string(),
        risk_level: z.string(),
        seller_message: z.string(),
        type: z.string(),
      }),
      paid: z.boolean(),
      payment_intent: z.any(),
      payment_method: z.string(),
      payment_method_details: z.object({
        card: z.object({
          brand: z.string(),
          checks: z.object({
            address_line1_check: z.any(),
            address_postal_code_check: z.any(),
            cvc_check: z.string(),
          }),
          country: z.string(),
          exp_month: z.number(),
          exp_year: z.number(),
          fingerprint: z.string(),
          funding: z.string(),
          installments: z.any(),
          last4: z.string(),
          mandate: z.any(),
          moto: z.any(),
          network: z.string(),
          network_token: z.object({
            used: z.boolean(),
          }),
          three_d_secure: z.any(),
          wallet: z.any(),
        }),
        type: z.string(),
      }),
      receipt_email: z.string(),
      receipt_number: z.any(),
      receipt_url: z.any(),
      redaction: z.any(),
      refunded: z.boolean(),
      refunds: z.object({
        object: z.string(),
        data: z.array(z.any()),
        has_more: z.boolean(),
        url: z.string(),
      }),
      review: z.any(),
      shipping: z.any(),
      source_transfer: z.any(),
      statement_descriptor: z.any(),
      statement_descriptor_suffix: z.any(),
      status: z.string(),
      transfer_data: z.any(),
      transfer_group: z.any(),
    }),
  ),
}).deepPartial();

export const queryChargesSchema = stripePaginationSchema.extend({
  customer: z.string().optional(),
  created: z.string().optional(),
  payment_intent: z.string().optional(),
  transfer_group: z.string().optional(),
});

export const plansSchema = z.object({
  object: z.string(),
  url: z.string(),
  has_more: z.boolean(),
  data: z.array(
    z.object({
      id: z.string(),
      object: z.string(),
      active: z.boolean(),
      aggregate_usage: z.any(),
      amount: z.number(),
      amount_decimal: z.string(),
      billing_scheme: z.string(),
      created: z.number(),
      currency: z.string(),
      interval: z.string(),
      interval_count: z.number(),
      livemode: z.boolean(),
      metadata: z.object({}),
      nickname: z.any(),
      product: z.string(),
      tiers_mode: z.any(),
      transform_usage: z.any(),
      trial_period_days: z.any(),
      usage_type: z.string(),
    }),
  ),
}).deepPartial();

export const queryPlansSchema = stripePaginationSchema.extend({
  active: z.boolean().optional(),
  product: z.string().optional(),
  created: z.string().optional(),
});

export const transactionsSchema = z.object({
  object: z.string(),
  url: z.string(),
  has_more: z.boolean(),
  data: z.array(
    z.object({
      id: z.string(),
      object: z.string(),
      amount: z.number(),
      available_on: z.number(),
      created: z.number(),
      currency: z.string(),
      description: z.string(),
      exchange_rate: z.any(),
      fee: z.number(),
      fee_details: z.array(
        z.object({
          amount: z.number(),
          application: z.any(),
          currency: z.string(),
          description: z.string(),
          type: z.string(),
        }),
      ),
      net: z.number(),
      reporting_category: z.string(),
      source: z.string(),
      status: z.string(),
      type: z.string(),
    }),
  ),
}).deepPartial();

export const queryTransactionsSchema = stripePaginationSchema.extend({
  payout: z.string().optional(),
  type: z.string().optional(),
  created: z.string().optional(),
  currency: z.string().optional(),
  source: z.string().optional(),
});

//types:

export type SubscriptionItems = z.infer<typeof subscriptionItemsSchema>;
export type Subscriptions = z.infer<typeof subscriptionsSchema>;
export type QuerySubscriptions = z.infer<typeof querySubscriptionsSchema>;
export type QuerySubscriptionItems = z.infer<
  typeof querySubscriptionItemsSchema
>;
export type Customers = z.infer<typeof customersSchema>;
export type QueryCustomers = z.infer<typeof queryCustomersSchema>;
export type Invoices = z.infer<typeof invoicesSchema>;
export type QueryInvoices = z.infer<typeof queryInvoicesSchema>;
export type Charges = z.infer<typeof chargesSchema>;
export type QueryCharges = z.infer<typeof queryChargesSchema>;
export type Plans = z.infer<typeof plansSchema>;
export type QueryPlans = z.infer<typeof queryPlansSchema>;
export type Transactions = z.infer<typeof transactionsSchema>;
export type QueryTransactions = z.infer<typeof queryTransactionsSchema>;
