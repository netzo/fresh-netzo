import { z } from "../../../deps/zod/mod.ts";

export const documentSchema = z.object({
  id: z.string(),
  name: z.string(),
  autonumbering_sequence_name_prefix: z.string(),
  date_created: z.string(),
  date_modified: z.string(),
  date_completed: z.string(),
  created_by: z.object({
    id: z.string(),
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    avatar: z.string(),
  }),
  template: z.object({
    id: z.string(),
    name: z.string(),
  }),
  expiration_date: z.any(),
  metadata: z.object({
    document__created_via_public_api: z.string(),
    my_favorite_pet: z.string(),
    opp_id: z.string(),
  }),
  tokens: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    }),
  ),
  fields: z.array(
    z.object({
      uuid: z.string(),
      field_id: z.string(),
      name: z.string(),
      merge_field: z.string().optional(),
      title: z.string(),
      placeholder: z.string().optional(),
      type: z.string(),
      assigned_to: z.object({
        id: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
        recipient_type: z.string(),
        has_completed: z.boolean(),
        role: z.string(),
        type: z.string(),
      }),
      value: z.any(),
    }),
  ),
  pricing: z.object({
    tables: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        total: z.string(),
        is_included_in_total: z.boolean(),
        summary: z.object({
          subtotal: z.string(),
          total: z.string(),
          discount: z.string(),
          tax: z.string(),
        }),
        items: z.array(
          z.object({
            id: z.any(),
            sku: z.any(),
            qty: z.number(),
            name: z.string(),
            cost: z.string(),
            price: z.string(),
            description: z.string(),
            custom_fields: z.object({
              Fluffiness: z.string(),
            }),
            custom_columns: z.object({
              Fluffiness: z.string(),
            }),
            discount: z.any(),
            tax_first: z.object({
              value: z.string(),
              type: z.string(),
            }),
            tax_second: z.any(),
            subtotal: z.string(),
            options: z.object({
              optional: z.boolean(),
              optional_selected: z.boolean(),
            }),
            sale_price: z.string(),
          }),
        ),
        currency: z.string(),
        columns: z.array(
          z.object({
            header: z.string().optional(),
            name: z.string(),
            merge_name: z.string().optional(),
            hidden: z.boolean(),
          }),
        ),
      }),
    ),
    total: z.string(),
  }),
  tags: z.array(z.any()),
  status: z.string(),
  recipients: z.array(
    z.object({
      id: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      email: z.string(),
      recipient_type: z.string(),
      has_completed: z.boolean(),
      role: z.string(),
      signing_order: z.number(),
      shared_link: z.string(),
    }),
  ),
  sent_by: z.any(),
  grand_total: z.object({
    amount: z.string(),
    currency: z.string(),
  }),
  linked_objects: z.array(
    z.object({
      provider: z.string(),
      entity_type: z.string(),
      entity_id: z.string(),
    }),
  ),
  version: z.string(),
  approval_execution: z.object({
    next_step: z.string(),
    steps: z.array(
      z.object({
        id: z.string(),
        assignee: z.any(),
        group: z.object({
          id: z.string(),
          name: z.string(),
          type: z.string(),
          assignees: z.array(
            z.object({
              id: z.string(),
              user: z.object({
                id: z.string(),
                email: z.string(),
                first_name: z.string(),
                last_name: z.string(),
                avatar: z.any(),
              }),
              is_selected: z.boolean(),
            }),
          ),
        }),
        conditions: z.array(
          z.object({
            relation: z.string(),
            type: z.string(),
            value: z.number(),
            kind: z.any(),
          }),
        ),
        approve_user: z.any(),
        approve_message: z.any(),
        reject_user: z.any(),
        reject_message: z.any(),
        is_skipped: z.boolean(),
        skip_reason: z.any(),
      }),
    ),
    sender: z.any(),
    sender_message: z.any(),
    skip_user: z.any(),
    skip_message: z.any(),
    is_completed: z.boolean(),
    is_editing_allowed: z.boolean(),
    is_ordering_enabled: z.boolean(),
  }),
}).deepPartial();

export const documentsSchema = z.object({
  results: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      status: z.string(),
      date_created: z.string(),
      date_modified: z.string(),
      expiration_date: z.any(),
      version: z.string(),
    }),
  ),
}).deepPartial();

export const queryDocumentsSchema = z.object({
  q: z.string().optional(),
  tag: z.string().optional(),
  status: z.number().optional(),
  count: z.number().optional(),
  page: z.number().optional(),
  metadata: z.string().optional(),
  deleted: z.boolean().optional(),
  id: z.string().optional(),
  template_id: z.string().optional(),
  folder_uuid: z.string().optional(),
  form_id: z.string().optional(),
  order_by: z.string().optional(),
  created_from: z.string().optional(),
  created_to: z.string().optional(),
  modified_from: z.string().optional(),
  modified_to: z.string().optional(),
  completed_from: z.string().optional(),
  completed_to: z.string().optional(),
  membership_id: z.string().optional(),
  contact_id: z.string().optional(),
});

export const dataUpdateDocumentSchema = z.object({
  recipients: z
    .array(
      z.object({
        email: z.string().optional(),
        first_name: z.string().optional(),
        last_name: z.string().optional(),
        role: z.string().optional(),
        default: z.boolean().optional(),
        ID: z.string().optional(),
      }),
    )
    .optional(),
  tokens: z
    .array(
      z.object({
        name: z.string().optional(),
        value: z.string().optional(),
      }),
    )
    .optional(),
  fields: z
    .array(
      z.object({
        value: z.string().optional(),
        role: z.string().optional(),
      }),
    )
    .optional(),
  pricing_tables: z
    .array(
      z.object({
        name: z.string().optional(),
        sections: z.string().optional(),
      }),
    )
    .optional(),
});

export const dataAddContactSchema = z.object({
  email: z.string(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  company: z.string().optional(),
  job_title: z.string().optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  street_address: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
});

export const contactSchema = dataAddContactSchema.extend({
  id: z.string(),
}).deepPartial();

export const contactsSchema = z.object({
  results: z.array(contactSchema),
}).deepPartial();

//types:

export type Document = z.infer<typeof documentSchema>;
export type Documents = z.infer<typeof documentsSchema>;
export type QueryDocuments = z.infer<typeof queryDocumentsSchema>;
export type DataUpdateDocument = z.infer<typeof dataUpdateDocumentSchema>;
export type DataAddContact = z.infer<typeof dataAddContactSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type Contacts = z.infer<typeof contactsSchema>;
