import { z } from "../../deps/zod/mod.ts";

export const customerSchema = z.object({
  "id": z.number(),
  "uuid": z.string(),
  "external_id": z.string(),
  "external_ids": z.array(z.string()),
  "data_source_uuid": z.string(),
  "data_source_uuids": z.array(z.string()),
  "name": z.string(),
  "company": z.string(),
  "email": z.string(),
  "status": z.string(),
  "lead_created_at": z.string(),
  "free_trial_started_at": z.string(),
  "customer_since": z.string(),
  "city": z.string(),
  "state": z.string(),
  "country": z.string(),
  "zip": z.string(),
  "attributes": z.object({
    tags: z.array(z.string()),
    stripe: z.any(),
    clearbit: z.any(),
    custom: z.any(),
  }),
  "address": z.object({
    address_zip: z.string(),
    city: z.string(),
    country: z.string(),
    state: z.string(),
  }),
  "mrr": z.number(),
  "arr": z.number(),
  "billing-system-url": z.string(),
  "chartmogul-url": z.string(),
  "billing-system-type": z.string(),
  "currency": z.string(),
  "currency-sign": z.string(),
}).deepPartial();

export const customersSchema = z.object({
  entries: z.array(customerSchema),
  has_more: z.boolean(),
  per_page: z.number(),
  page: z.number(),
  current_page: z.number(),
  total_pages: z.number(),
}).deepPartial();

export const queryCustomersSchema = z.object({
  data_source_uuid: z.string().optional(),
  external_id: z.string().optional(),
  status: z
    .union([
      z.literal("Lead"),
      z.literal("Active"),
      z.literal("Past_Due"),
      z.literal("Cancelled"),
    ])
    .optional(),
  system: z.string().optional(),
  page: z.number().optional(),
  per_page: z.number().optional(),
});

export const dataAddCustomerSchema = z.object({
  data_source_uuid: z.string(),
  external_id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  lead_created_at: z.string().optional(),
  free_trial_started_at: z.string().optional(),
  owner: z.string().optional(),
  attributes: z
    .object({
      tags: z.array(z.string()).optional(),
      custom: z
        .array(
          z.object({
            type: z.string(),
            key: z.string(),
            value: z.string(),
            source: z.string().optional(),
          }),
        )
        .optional(),
    })
    .optional(),
  primary_contact: z
    .object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      email: z.string().optional(),
      title: z.string().optional(),
      phone: z.string().optional(),
      linked_in: z.string().optional(),
      twitter: z.string().optional(),
      notes: z.string().optional(),
    })
    .optional(),
});

export const addOrUpdateCustomerResultSchema = z.object({
  "id": z.number(),
  "uuid": z.string(),
  "external_id": z.string(),
  "name": z.string(),
  "email": z.string(),
  "status": z.string(),
  "customer-since": z.any(),
  "attributes": z.object({
    custom: z.record(z.any()),
    clearbit: z.object({}),
    stripe: z.object({}),
    tags: z.array(z.string()),
  }),
  "data_source_uuid": z.string(),
  "data_source_uuids": z.array(z.string()),
  "external_ids": z.array(z.string()),
  "company": z.string(),
  "country": z.string(),
  "state": z.any(),
  "city": z.string(),
  "zip": z.any(),
  "lead_created_at": z.string(),
  "free_trial_started_at": z.string(),
  "address": z.object({
    country: z.string(),
    state: z.any(),
    city: z.string(),
    address_zip: z.any(),
  }),
  "mrr": z.number(),
  "arr": z.number(),
  "billing-system-url": z.any(),
  "chartmogul-url": z.string(),
  "billing-system-type": z.string(),
  "currency": z.string(),
  "currency-sign": z.string(),
  "owner": z.string(),
}).deepPartial();

export const dataUpdateCustomerSchema = dataAddCustomerSchema.omit({
  data_source_uuid: true,
  external_id: true,
});

export const customerSubscriptionsSchema = z.object({
  customer_uuid: z.string(),
  subscriptions: z.array(
    z.object({
      uuid: z.string(),
      external_id: z.string(),
      subscription_set_external_id: z.string(),
      plan_uuid: z.string(),
      data_source_uuid: z.string(),
      cancellation_dates: z.array(z.any()),
    }),
  ),
  current_page: z.number(),
  total_pages: z.number(),
}).deepPartial();

export const queryCustomerSubscriptionsSchema = z.object({
  page: z.number().optional(),
  per_page: z.number().optional(),
});

export const invoiceSchema = z.object({
  uuid: z.string(),
  customer_uuid: z.string(),
  external_id: z.string(),
  date: z.string(),
  due_date: z.string(),
  currency: z.string(),
  line_items: z.array(
    z.object({
      uuid: z.string(),
      external_id: z.any(),
      type: z.string(),
      subscription_uuid: z.string().optional(),
      subscription_external_id: z.string().optional(),
      subscription_set_external_id: z.string().optional(),
      plan_uuid: z.string().optional(),
      prorated: z.boolean().optional(),
      service_period_start: z.string().optional(),
      service_period_end: z.string().optional(),
      amount_in_cents: z.number(),
      quantity: z.number(),
      discount_code: z.string(),
      discount_amount_in_cents: z.number(),
      tax_amount_in_cents: z.number(),
      transaction_fees_in_cents: z.number(),
      transaction_fees_currency: z.string(),
      discount_description: z.string(),
      event_order: z.number().optional(),
      account_code: z.any(),
      description: z.string().optional(),
    }),
  ),
  transactions: z.array(
    z.object({
      uuid: z.string(),
      external_id: z.any(),
      type: z.string(),
      date: z.string(),
      result: z.string(),
    }),
  ),
}).deepPartial();

export const customerInvoicesSchema = z.object({
  customer_uuid: z.string(),
  invoices: z.array(invoiceSchema.omit({ customer_uuid: true })),
}).deepPartial();

export const queryCustomerInvoicesSchema = z.object({
  page: z.number().optional(),
  per_page: z.number().optional(),
  validation_type: z
    .union([z.literal("valid"), z.literal("invalid"), z.literal("all")])
    .optional(),
});

export const invoicesSchema = z.object({
  invoices: z.array(invoiceSchema),
  current_page: z.number(),
  total_pages: z.number(),
}).deepPartial();

export const queryInvoicesSchema = queryCustomerInvoicesSchema.extend({
  data_source_uuid: z.string().optional(),
  customer_uuid: z.string().optional(),
  external_id: z.string().optional(),
});

export const queryInvoiceSchema = queryCustomerInvoicesSchema.pick({
  validation_type: true,
});

// types:

export type Customer = z.infer<typeof customerSchema>;
export type Customers = z.infer<typeof customersSchema>;
export type QueryCustomers = z.infer<typeof queryCustomersSchema>;
export type DataAddCustomer = z.infer<typeof dataAddCustomerSchema>;
export type AddOrUpdateCustomerResult = z.infer<
  typeof addOrUpdateCustomerResultSchema
>;
export type DataUpdateCustomer = z.infer<typeof dataUpdateCustomerSchema>;
export type CustomerSubscriptions = z.infer<typeof customerSubscriptionsSchema>;
export type QueryCustomerSubscriptions = z.infer<
  typeof queryCustomerSubscriptionsSchema
>;
export type Invoice = z.infer<typeof invoiceSchema>;
export type CustomerInvoices = z.infer<typeof customerInvoicesSchema>;
export type QueryCustomerInvoices = z.infer<typeof queryCustomerInvoicesSchema>;
export type Invoices = z.infer<typeof invoicesSchema>;
export type QueryInvoices = z.infer<typeof queryInvoicesSchema>;
export type QueryInvoice = z.infer<typeof queryInvoiceSchema>;
