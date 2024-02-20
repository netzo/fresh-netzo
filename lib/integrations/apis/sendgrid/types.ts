import { z } from "../../../deps/zod/mod.ts";

export const dataUpdateListSchema = z.object({
  name: z.string(),
});

export const updateListResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  contact_count: z.number(),
  _metadata: z.object({
    self: z.string(),
  }),
}).deepPartial();

export const listSchema = z.object({
  id: z.string(),
  name: z.string(),
  contact_count: z.number(),
  _metadata: z.object({
    self: z.string(),
  }),
  contact_sample: z.object({
    id: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    unique_name: z.string(),
    email: z.string(),
    alternate_emails: z.array(z.string()),
    address_line_1: z.string(),
    address_line_2: z.string(),
    city: z.string(),
    state_province_region: z.string(),
    country: z.string(),
    postal_code: z.string(),
    phone_number: z.string(),
    whatsapp: z.string(),
    line: z.string(),
    facebook: z.string(),
    list_ids: z.array(z.string()),
    segment_ids: z.array(z.string()),
    custom_fields: z.object({
      created_at: z.string(),
      updated_at: z.string(),
      _metadata: z.object({
        self: z.string(),
      }),
    }),
  }),
}).deepPartial();

export const listsSchema = z.object({
  result: z.array(updateListResultSchema),
  _metadata: z.object({
    prev: z.string(),
    self: z.string(),
    next: z.string(),
    count: z.string(),
  }),
}).deepPartial();

export const queryListsSchema = z.object({
  page_size: z.number().optional(),
  page_token: z.string().optional(),
});

export const queryListSchema = z.object({
  contact_sample: z.boolean().optional(),
});

export const dataAddContactsSchema = z.object({
  list_ids: z.array(z.string()),
  contacts: z.array(
    z.object({
      email: z.string(),
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      alternate_emails: z.array(z.string()).optional(),
      address_line_1: z.string().optional(),
      address_line_2: z.string().optional(),
      city: z.string().optional(),
      state_province_region: z.string().optional(),
      country: z.string().optional(),
      postal_code: z.string().optional(),
      custom_fields: z.object({}).optional(),
    }),
  ),
});

export const addContactsResultSchema = z.object({
  job_id: z.string(),
}).deepPartial();

export const dataSendemailSchema = z.object({
  personalizations: z.array(
    z.object({
      to: z.array(
        z.object({
          email: z.string(),
          name: z.string().optional(),
        }),
      ),
      cc: z
        .array(
          z.object({
            email: z.string().optional(),
            name: z.string().optional(),
          }),
        )
        .optional(),
      bcc: z
        .array(
          z.object({
            email: z.string().optional(),
            name: z.string().optional(),
          }),
        )
        .optional(),
      from: z
        .object({
          email: z.string().optional(),
          name: z.string().optional(),
        })
        .optional(),
      subject: z.string().optional(),
      headers: z.object({}).optional(),
      substitutions: z.object({}).optional(),
      dynamic_template_data: z.object({}).optional(),
      custom_args: z.object({}).optional(),
      send_at: z.number().optional(),
    }),
  ),
  from: z.object({
    email: z.string(),
    name: z.string().optional(),
  }),
  reply_to: z
    .object({
      email: z.string().optional(),
      name: z.string().optional(),
    })
    .optional(),
  subject: z.string(),
  content: z.array(
    z.object({
      type: z.string(),
      value: z.string(),
    }),
  ),
  attachments: z
    .array(
      z.object({
        content: z.string().optional(),
        filename: z.string().optional(),
        type: z.string().optional(),
        disposition: z.string().optional(),
      }),
    )
    .optional(),
  categories: z.array(z.string()).optional(),
  send_at: z.number().optional(),
  batch_id: z.string().optional(),
  asm: z
    .object({
      group_id: z.number().optional(),
      groups_to_display: z.array(z.number()).optional(),
    })
    .optional(),
  ip_pool_name: z.string().optional(),
  mail_settings: z
    .object({
      bypass_list_management: z
        .object({
          enable: z.boolean().optional(),
        })
        .optional(),
      footer: z
        .object({
          enable: z.boolean().optional(),
        })
        .optional(),
      sandbox_mode: z
        .object({
          enable: z.boolean().optional(),
        })
        .optional(),
    })
    .optional(),
  tracking_settings: z
    .object({
      click_tracking: z
        .object({
          enable: z.boolean().optional(),
          enable_text: z.boolean().optional(),
        })
        .optional(),
      open_tracking: z
        .object({
          enable: z.boolean().optional(),
          substitution_tag: z.string().optional(),
        })
        .optional(),
      subscription_tracking: z
        .object({
          enable: z.boolean().optional(),
        })
        .optional(),
    })
    .optional(),
});

// types:

export type DataUpdateList = z.infer<typeof dataUpdateListSchema>;
export type UpdateListResult = z.infer<typeof updateListResultSchema>;
export type List = z.infer<typeof listSchema>;
export type Lists = z.infer<typeof listsSchema>;
export type QueryLists = z.infer<typeof queryListsSchema>;
export type QueryList = z.infer<typeof queryListSchema>;
export type DataAddContacts = z.infer<typeof dataAddContactsSchema>;
export type AddContactsResult = z.infer<typeof addContactsResultSchema>;
export type DataSendEmail = z.infer<typeof dataSendemailSchema>;
