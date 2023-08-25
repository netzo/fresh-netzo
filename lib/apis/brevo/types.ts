import { z } from "../deps.ts";

const brevoPaginationSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
  sort: z.union([z.literal("asc"), z.literal("desc")]).optional(),
});

const contactBaseSchema = z.object({
  email: z.string(),
  id: z.number(),
  emailBlacklisted: z.boolean(),
  smsBlacklisted: z.boolean(),
  createdAt: z.string(),
  modifiedAt: z.string(),
  listIds: z.array(z.number()),
  attributes: z.record(z.any()),
});

export const contactsSchema = z.object({
  contacts: z.array(contactBaseSchema),
  count: z.number(),
}).deepPartial();

export const queryContactsSchema = brevoPaginationSchema.extend({
  modifiedSince: z.string().optional(),
  createdSince: z.string().optional(),
});

export const queryContactSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const contactSchema = contactBaseSchema.extend({
  listIds: z.array(z.number()),
  statistics: z.object({
    messagesSent: z.array(
      z.object({
        campaignId: z.number(),
        eventTime: z.string(),
      }),
    ),
    opened: z.array(
      z.object({
        campaignId: z.number(),
        count: z.number(),
        eventTime: z.string(),
        ip: z.string(),
      }),
    ),
    clicked: z.array(
      z.object({
        campaignId: z.number(),
        links: z.array(
          z.object({
            count: z.number(),
            eventTime: z.string(),
            ip: z.string(),
            url: z.string(),
          }),
        ),
      }),
    ),
    delivered: z.array(
      z.object({
        campaignId: z.number(),
        count: z.number(),
        eventTime: z.string(),
        ip: z.string(),
      }),
    ),
  }),
}).deepPartial();

export const dataAddContactSchema = z.object({
  email: z.string().optional(),
  ext_id: z.string().optional(),
  attributes: z.record(z.any()).optional(),
  emailBlacklisted: z.boolean().optional(),
  smsBlacklisted: z.boolean().optional(),
  listIds: z.array(z.number()).optional(),
  updateEnabled: z.boolean().optional(),
  smtpBlacklistSender: z.array(z.string()).optional(),
});

export const dataUpdateContactSchema = dataAddContactSchema.omit({
  email: true,
  updateEnabled: true,
}).extend({
  unlinkListIds: z.array(z.number()).optional(),
});

export const emailCampaignsSchema = z.object({
  count: z.number(),
  campaigns: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      subject: z.string(),
      previewText: z.string(),
      type: z.string(),
      status: z.string(),
      scheduledAt: z.string(),
      testSent: z.boolean(),
      header: z.string(),
      footer: z.string(),
      sender: z.object({
        email: z.string(),
        name: z.string(),
        id: z.number(),
      }),
      replyTo: z.string(),
      toField: z.string(),
      htmlContent: z.string(),
      shareLink: z.string(),
      tag: z.string(),
      createdAt: z.string(),
      modifiedAt: z.string(),
      inlineImageActivation: z.boolean(),
      mirrorActive: z.boolean(),
      recurring: z.boolean(),
      recipients: z.object({
        lists: z.array(z.number()),
        exclusionLists: z.array(z.number()),
      }),
      statistics: z.object({
        globalStats: z.object({
          uniqueClicks: z.number(),
          clickers: z.number(),
          complaints: z.number(),
          delivered: z.number(),
          sent: z.number(),
          softBounces: z.number(),
          hardBounces: z.number(),
          uniqueViews: z.number(),
          trackableViews: z.number(),
          trackableViewsRate: z.number(),
          estimatedViews: z.number(),
          unsubscriptions: z.number(),
          viewed: z.number(),
        }),
        campaignStats: z.array(
          z.object({
            listId: z.number(),
            uniqueClicks: z.number(),
            clickers: z.number(),
            complaints: z.number(),
            delivered: z.number(),
            sent: z.number(),
            softBounces: z.number(),
            hardBounces: z.number(),
            uniqueViews: z.number(),
            trackableViews: z.number(),
            unsubscriptions: z.number(),
            viewed: z.number(),
            deferred: z.number(),
          }),
        ),
        mirrorClick: z.number(),
        remaining: z.number(),
        linksStats: z.record(z.any()),
        statsByDomain: z.record(
          z.object({
            uniqueClicks: z.number(),
            clickers: z.number(),
            complaints: z.number(),
            sent: z.number(),
            softBounces: z.number(),
            hardBounces: z.number(),
            uniqueViews: z.number(),
            unsubscriptions: z.number(),
            viewed: z.number(),
            delivered: z.number(),
          }),
        ),
      }),
    }),
  ),
}).deepPartial();

export const queryEmailCampaignsSchema = brevoPaginationSchema.extend({
  type: z.union([z.literal("classic"), z.literal("trigger")]).optional(),
  status: z
    .union([
      z.literal("suspended"),
      z.literal("archive"),
      z.literal("sent"),
      z.literal("queued"),
      z.literal("draft"),
      z.literal("inProcess"),
    ])
    .optional(),
  statistics: z
    .union([
      z.literal("globalStats"),
      z.literal("linksStats"),
      z.literal("statsByDomain"),
    ])
    .optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  excludeHtmlContent: z.boolean().optional(),
});

export const companiesSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      attributes: z.object({
        created_at: z.string(),
        domain: z.string(),
        last_updated_at: z.string(),
        name: z.string(),
        number_of_contacts: z.number(),
        owner: z.string(),
        owner_assign_date: z.string(),
        phone_number: z.number(),
        revenue: z.number(),
      }),
      linkedContactsIds: z.array(z.number()),
      linkedDealsIds: z.array(z.string()),
    }),
  ),
}).deepPartial();

export const queryCompaniesSchema = brevoPaginationSchema.omit({ offset: true })
  .extend({
    filters: z.string().optional(),
    linkedContactsIds: z.number().optional(),
    linkedDealsIds: z.string().optional(),
    page: z.number().optional(),
    sortBy: z.string().optional(),
  });

//types:

export type Contacts = z.infer<typeof contactsSchema>;
export type QueryContacts = z.infer<typeof queryContactsSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type QueryContact = z.infer<typeof queryContactSchema>;
export type DataAddContact = z.infer<typeof dataAddContactSchema>;
export type DataUpdateContact = z.infer<typeof dataUpdateContactSchema>;
export type EmailCampaigns = z.infer<typeof emailCampaignsSchema>;
export type QueryEmailCampaigns = z.infer<typeof queryEmailCampaignsSchema>;
export type Companies = z.infer<typeof companiesSchema>;
export type QueryCompanies = z.infer<typeof queryCompaniesSchema>;
