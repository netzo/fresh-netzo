import { z } from "netzo/deps/zod/mod.ts";

export const siteSchema = z.object({
  version: z.string(),
  properties: z.object({
    categories: z.object({
      primary: z.string(),
      secondary: z.array(z.string()),
    }),
    locale: z.object({
      languageCode: z.string(),
      country: z.string(),
    }),
    language: z.string(),
    paymentCurrency: z.string(),
    timeZone: z.string(),
    email: z.string(),
    phone: z.string(),
    fax: z.string(),
    address: z.object({}),
    siteDisplayName: z.string(),
    businessName: z.string(),
    businessConfig: z.string(),
    logo: z.string(),
    description: z.string(),
    businessSchedule: z.object({
      periods: z.array(z.object({})),
      specialHourPeriod: z.array(z.object({})),
    }),
    multilingual: z.object({
      supportedLanguages: z.array(z.object({})),
      autoRedirect: z.boolean(),
    }),
    consentPolicy: z.object({
      essential: z.boolean(),
      functional: z.boolean(),
      analytics: z.boolean(),
      advertising: z.boolean(),
      dataToThirdParty: z.boolean(),
    }),
    externalSiteUrl: z.string(),
    trackClicksAnalytics: z.boolean(),
  }),
}).deepPartial();

export const querySiteSchema = z.object({
  fields: z
    .object({
      paths: z.array(z.string()).optional(),
    })
    .optional(),
});

const contactBaseSchema = z.object({
  id: z.string(),
  revision: z.number(),
  source: z.object({
    sourceType: z.string(),
    appId: z.string(),
  }),
  createdDate: z.string(),
  updatedDate: z.string(),
  lastActivity: z.object({
    activityDate: z.string(),
    activityType: z.string(),
  }),
  primaryInfo: z.object({
    email: z.string(),
    phone: z.string(),
  }),
  picture: z.object({
    id: z.string(),
    url: z.string(),
    height: z.number(),
    width: z.number(),
  }),
  info: z.object({
    name: z.object({
      first: z.string(),
      last: z.string(),
    }),
    emails: z.object({
      items: z.array(
        z.object({
          id: z.string(),
          tag: z.string(),
          email: z.string(),
          primary: z.boolean(),
        }),
      ),
    }),
    phones: z.object({
      items: z.array(
        z.object({
          id: z.string(),
          tag: z.string(),
          countryCode: z.string(),
          phone: z.string(),
          e164Phone: z.string(),
          primary: z.boolean(),
        }),
      ),
    }),
    addresses: z.object({
      items: z.array(
        z.object({
          id: z.string(),
          tag: z.string(),
          address: z.object({
            country: z.string(),
            subdivision: z.string(),
            city: z.string(),
            postalCode: z.string(),
            addressLine: z.string().optional(),
            addressLine2: z.string(),
            streetAddress: z
              .object({
                number: z.string(),
                name: z.string(),
              })
              .optional(),
          }),
        }),
      ),
    }),
    company: z.string(),
    jobTitle: z.string(),
    birthdate: z.string(),
    locale: z.string(),
    labelKeys: z.object({
      items: z.array(z.string()),
    }),
    extendedFields: z.object({
      items: z.object({}),
    }),
    locations: z.object({
      items: z.array(z.string()),
    }),
  }),
});

export const contactSchema = z.object({
  contact: contactBaseSchema,
}).deepPartial();

export const contactsSchema = z.object({
  contacts: z.array(contactBaseSchema),
  pagingMetadata: z.object({
    count: z.number(),
    offset: z.number(),
    total: z.number(),
  }),
}).deepPartial();

export const queryContactsSchema = z.object({
  sort: z
    .object({
      fieldName: z.string().optional(),
      order: z.union([z.literal("ASC"), z.literal("DESC")]).optional(),
    })
    .optional(),
  paging: z
    .object({
      limit: z.number().optional(),
      offset: z.number().optional(),
    })
    .optional(),
  fields: z.array(z.string()).optional(),
  fieldsets: z.array(z.string()).optional(),
});

export const dataAddContactSchema = z.object({
  info: z.object({
    name: z
      .object({
        first: z.string().optional(),
        last: z.string().optional(),
      })
      .optional(),
    emails: z
      .object({
        items: z
          .array(
            z.object({
              tag: z.string().optional(),
              email: z.string().optional(),
              primary: z.boolean().optional(),
            }),
          )
          .optional(),
      })
      .optional(),
    phones: z
      .object({
        items: z
          .array(
            z.object({
              tag: z.string().optional(),
              countryCode: z.string().optional(),
              phone: z.string().optional(),
              primary: z.boolean().optional(),
            }),
          )
          .optional(),
      })
      .optional(),
    addresses: z
      .object({
        items: z
          .array(
            z.object({
              tag: z.string().optional(),
              address: z.object({}).optional(),
            }),
          )
          .optional(),
      })
      .optional(),
    company: z.string().optional(),
    jobTitle: z.string().optional(),
    birthdate: z.string().optional(),
    locale: z.string().optional(),
    labelKeys: z
      .object({
        items: z.array(z.object({})).optional(),
      })
      .optional(),
    extendedFields: z
      .object({
        items: z.record(z.any()).optional(),
      })
      .optional(),
    picture: z
      .object({
        image: z.object({}).optional(),
      })
      .optional(),
  }),
  allowDuplicates: z.boolean().optional(),
});

export const dataUpdateContactSchema = dataAddContactSchema.extend({
  revision: z.number(),
});

//types:

export type Site = z.infer<typeof siteSchema>;
export type QuerySite = z.infer<typeof querySiteSchema>;
export type ContactBase = z.infer<typeof contactBaseSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type Contacts = z.infer<typeof contactsSchema>;
export type QueryContacts = z.infer<typeof queryContactsSchema>;
export type DataAddContact = z.infer<typeof dataAddContactSchema>;
export type DataUpdateContact = z.infer<typeof dataUpdateContactSchema>;
