import { z } from "../deps.ts";

const contactBaseSchema = z.object({
  properties: z.object({
    company: z.string(),
    createdate: z.string(),
    email: z.string(),
    firstname: z.string(),
    lastmodifieddate: z.string(),
    lastname: z.string(),
    phone: z.string(),
    website: z.string(),
  }),
});

export const contactsSchema = z.object({
  results: z.array(contactBaseSchema),
  paging: z.object({
    next: z.object({
      after: z.string(),
      link: z.string(),
    }),
  }),
});

export const queryContactsSchema = z.object({
  limit: z.number().optional(),
  after: z.string().optional(),
  properties: z.tuple([]).optional(),
});

export const dataAddOrUpdateContactSchema = z.object({
  properties: contactBaseSchema.shape.properties.omit({
    createdate: true,
    lastmodifieddate: true,
  }),
});

export const addOrUpdateContactResultSchema = contactBaseSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  archived: z.boolean(),
});

export const formSchema = z.object({
  portalId: z.number(),
  guid: z.string(),
  name: z.string(),
  action: z.string(),
  method: z.string(),
  cssClass: z.string(),
  redirect: z.string(),
  submitText: z.string(),
  followUpId: z.string(),
  notifyRecipients: z.string(),
  leadNurturingCampaignId: z.string(),
  formFieldGroups: z.array(
    z.object({
      fields: z.array(
        z.object({
          name: z.string(),
          label: z.string(),
          type: z.string(),
          fieldType: z.string(),
          description: z.string(),
          groupName: z.string(),
          displayOrder: z.number(),
          required: z.boolean(),
          selectedOptions: z.array(z.any()),
          options: z.array(z.any()),
          validation: z.object({
            name: z.string(),
            message: z.string(),
            data: z.string(),
            useDefaultBlockList: z.boolean(),
            blockedEmailAddresses: z.array(z.any()),
          }),
          enabled: z.boolean(),
          hidden: z.boolean(),
          defaultValue: z.string(),
          isSmartField: z.boolean(),
          unselectedLabel: z.string(),
          placeholder: z.string(),
          dependentFieldFilters: z.array(z.any()),
          labelHidden: z.boolean(),
        }),
      ),
      default: z.boolean(),
      isSmartGroup: z.boolean(),
      richText: z.object({
        content: z.string(),
      }),
    }),
  ),
  createdAt: z.number(),
  updatedAt: z.number(),
  performableHtml: z.string(),
  migratedFrom: z.string(),
  ignoreCurrentValues: z.boolean(),
  metaData: z.array(z.any()),
  deletable: z.boolean(),
  inlineMessage: z.string(),
  tmsId: z.string(),
  captchaEnabled: z.boolean(),
  campaignGuid: z.string(),
  cloneable: z.boolean(),
  editable: z.boolean(),
  formType: z.string(),
});

export const queryFormsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
  formTypes: z.literal("ALL").optional(),
});

export const formSubmissionsSchema = z.object({
  results: z.array(
    z.object({
      submittedAt: z.number(),
      values: z.array(
        z.object({
          name: z.string(),
          value: z.string(),
        }),
      ),
      pageUrl: z.string().optional(),
    }),
  ),
  paging: z.object({
    next: z.object({
      after: z.string(),
      link: z.string(),
    }),
  }),
});

export const querySubmissionsSchema = z.object({
  limit: z.number().optional(),
  after: z.string().optional(),
});

export const queryDealsSchema = z.object({
  limit: z.number().optional(),
  after: z.string().optional(),
  properties: z.array(z.string()).optional(),
});

const dealBaseSchema = z.object({
  properties: z.object({
    amount: z.string(),
    closedate: z.string(),
    createdate: z.string(),
    dealname: z.string(),
    dealstage: z.string(),
    hs_lastmodifieddate: z.string(),
    hubspot_owner_id: z.string(),
    pipeline: z.string(),
  }),
});

export const dealsSchema = z.object({
  results: z.array(dealBaseSchema),
  paging: z.object({
    next: z.object({
      after: z.string(),
      link: z.string(),
    }),
  }),
});

export const dataAddDealSchema = z.object({
  properties: z
    .object({
      amount: z.string().optional(),
      closedate: z.string().optional(),
      dealname: z.string().optional(),
      dealstage: z.string().optional(),
      hubspot_owner_id: z.string().optional(),
      pipeline: z.string().optional(),
    })
    .optional(),
  associations: z
    .array(
      z.object({
        to: z
          .object({
            id: z.string().optional(),
          })
          .optional(),
        types: z
          .array(
            z.object({
              associationCategory: z.string().optional(),
              associationTypeId: z.number().optional(),
            }),
          )
          .optional(),
      }),
    )
    .optional(),
});

export const addDealResultSchema = dealBaseSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  archived: z.boolean(),
});

// types:

export type Contacts = z.infer<typeof contactsSchema>;
export type QueryContacts = z.infer<typeof queryContactsSchema>;
export type DataAddOrUpdateContact = z.infer<
  typeof dataAddOrUpdateContactSchema
>;
export type AddOrUpdateContactResult = z.infer<
  typeof addOrUpdateContactResultSchema
>;
export type Form = z.infer<typeof formSchema>;
export type QueryForms = z.infer<typeof queryFormsSchema>;
export type FormSubmissions = z.infer<typeof formSubmissionsSchema>;
export type QuerySubmissions = z.infer<typeof querySubmissionsSchema>;
export type QueryDeals = z.infer<typeof queryDealsSchema>;
export type DealBase = z.infer<typeof dealBaseSchema>;
export type Deals = z.infer<typeof dealsSchema>;
export type DataAddDeal = z.infer<typeof dataAddDealSchema>;
export type AddDealResult = z.infer<typeof addDealResultSchema>;
