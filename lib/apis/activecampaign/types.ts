import { z } from "../deps.ts";

export const contactSchema = z.object({
  contactAutomations: z.array(
    z.object({
      contact: z.string(),
      seriesid: z.string(),
      startid: z.string(),
      status: z.string(),
      adddate: z.string(),
      remdate: z.any(),
      timespan: z.any(),
      lastblock: z.string(),
      lastdate: z.string(),
      completedElements: z.string(),
      totalElements: z.string(),
      completed: z.number(),
      completeValue: z.number(),
      links: z.object({
        automation: z.string(),
        contact: z.string(),
        contactGoals: z.string(),
      }),
      id: z.string(),
      automation: z.string(),
    }),
  ),
  contactLists: z.array(
    z.object({
      contact: z.string(),
      list: z.string(),
      form: z.any(),
      seriesid: z.string(),
      sdate: z.any(),
      udate: z.any(),
      status: z.string(),
      responder: z.string(),
      sync: z.string(),
      unsubreason: z.any(),
      campaign: z.any(),
      message: z.any(),
      first_name: z.string(),
      last_name: z.string(),
      ip4Sub: z.string(),
      sourceid: z.string(),
      autosyncLog: z.any(),
      ip4_last: z.string(),
      ip4Unsub: z.string(),
      unsubscribeAutomation: z.any(),
      links: z.object({
        automation: z.string(),
        list: z.string(),
        contact: z.string(),
        form: z.string(),
        autosyncLog: z.string(),
        campaign: z.string(),
        unsubscribeAutomation: z.string(),
        message: z.string(),
      }),
      id: z.string(),
      automation: z.any(),
    }),
  ),
  deals: z.array(
    z.object({
      owner: z.string(),
      contact: z.string(),
      organization: z.any(),
      group: z.any(),
      title: z.string(),
      nexttaskid: z.string(),
      currency: z.string(),
      status: z.string(),
      links: z.object({
        activities: z.string(),
        contact: z.string(),
        contactDeals: z.string(),
        group: z.string(),
        nextTask: z.string(),
        notes: z.string(),
        organization: z.string(),
        owner: z.string(),
        scoreValues: z.string(),
        stage: z.string(),
        tasks: z.string(),
      }),
      id: z.string(),
      nextTask: z.any(),
    }),
  ),
  fieldValues: z.array(
    z.object({
      contact: z.string(),
      field: z.string(),
      value: z.any(),
      cdate: z.string(),
      udate: z.string(),
      links: z.object({
        owner: z.string(),
        field: z.string(),
      }),
      id: z.string(),
      owner: z.string(),
    }),
  ),
  geoAddresses: z.array(
    z.object({
      ip4: z.string(),
      country2: z.string(),
      country: z.string(),
      state: z.string(),
      city: z.string(),
      zip: z.string(),
      area: z.string(),
      lat: z.string(),
      lon: z.string(),
      tz: z.string(),
      tstamp: z.string(),
      links: z.array(z.any()),
      id: z.string(),
    }),
  ),
  geoIps: z.array(
    z.object({
      contact: z.string(),
      campaignid: z.string(),
      messageid: z.string(),
      geoaddrid: z.string(),
      ip4: z.string(),
      tstamp: z.string(),
      geoAddress: z.string(),
      links: z.object({
        geoAddress: z.string(),
      }),
      id: z.string(),
    }),
  ),
  contact: z.object({
    cdate: z.string(),
    email: z.string(),
    phone: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    orgid: z.string(),
    segmentio_id: z.string(),
    bounced_hard: z.string(),
    bounced_soft: z.string(),
    bounced_date: z.any(),
    ip: z.string(),
    ua: z.any(),
    hash: z.string(),
    socialdata_lastcheck: z.any(),
    email_local: z.string(),
    email_domain: z.string(),
    sentcnt: z.string(),
    rating_tstamp: z.any(),
    gravatar: z.string(),
    deleted: z.string(),
    adate: z.any(),
    udate: z.any(),
    edate: z.any(),
    contactAutomations: z.array(z.string()),
    contactLists: z.array(z.string()),
    fieldValues: z.array(z.string()),
    geoIps: z.array(z.string()),
    deals: z.array(z.string()),
    accountContacts: z.array(z.string()),
    links: z.object({
      bounceLogs: z.string(),
      contactAutomations: z.string(),
      contactData: z.string(),
      contactGoals: z.string(),
      contactLists: z.string(),
      contactLogs: z.string(),
      contactTags: z.string(),
      contactDeals: z.string(),
      deals: z.string(),
      fieldValues: z.string(),
      geoIps: z.string(),
      notes: z.string(),
      organization: z.string(),
      plusAppend: z.string(),
      trackingLogs: z.string(),
      scoreValues: z.string(),
    }),
    id: z.string(),
    organization: z.any(),
  }),
}).deepPartial();

export const contactsSchema = z.object({
  scoreValues: z.array(z.any()),
  contacts: z.array(
    z.object({
      cdate: z.string(),
      email: z.string(),
      phone: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      orgid: z.string(),
      segmentio_id: z.string(),
      bounced_hard: z.string(),
      bounced_soft: z.string(),
      bounced_date: z.string().optional(),
      ip: z.string(),
      ua: z.string().optional(),
      hash: z.string(),
      socialdata_lastcheck: z.string().optional(),
      email_local: z.string(),
      email_domain: z.string(),
      sentcnt: z.string(),
      rating_tstamp: z.string().optional(),
      gravatar: z.string(),
      deleted: z.string(),
      anonymized: z.string(),
      udate: z.string(),
      deleted_at: z.string().optional(),
      scoreValues: z.array(z.any()),
      links: z.object({
        bounceLogs: z.string(),
        contactAutomations: z.string(),
        contactData: z.string(),
        contactGoals: z.string(),
        contactLists: z.string(),
        contactLogs: z.string(),
        contactTags: z.string(),
        contactDeals: z.string(),
        deals: z.string(),
        fieldValues: z.string(),
        geoIps: z.string(),
        notes: z.string(),
        organization: z.string(),
        plusAppend: z.string(),
        trackingLogs: z.string(),
        scoreValues: z.string(),
      }),
      id: z.string(),
      organization: z.any(),
      adate: z.string().optional(),
      edate: z.string().optional(),
    }),
  ),
  meta: z.object({
    total: z.string(),
    page_input: z.object({
      segmentid: z.number(),
      formid: z.number(),
      listid: z.number(),
      tagid: z.number(),
      limit: z.number(),
      offset: z.number(),
      search: z.any(),
      sort: z.any(),
      seriesid: z.number(),
      waitid: z.number(),
      status: z.number(),
      forceQuery: z.number(),
      cacheid: z.string(),
    }),
  }),
}).deepPartial();

export const queryContactsSchema = z.object({
  ids: z.string().optional(),
  email: z.string().optional(),
  email_like: z.string().optional(),
  exclude: z.number().optional(),
  formid: z.number().optional(),
  id_greater: z.number().optional(),
  id_less: z.number().optional(),
  listid: z.string().optional(),
  organization: z.number().optional(),
  search: z.string().optional(),
  segmentid: z.number().optional(),
  seriesid: z.number().optional(),
  status: z.number().optional(),
  tagid: z.number().optional(),
  filters: z.object({
    created_before: z.string().optional(),
    updated_before: z.string().optional(),
    updated_after: z.string().optional(),
  }),
  waitid: z.number().optional(),
  orders: z.object({
    cdate: z.string().optional(),
    email: z.string().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    name: z.string().optional(),
    score: z.string().optional(),
  }),
  in_group_lists: z.string().optional(),
});

export const dataAddContactSchema = z.object({
  contact: z.object({
    email: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    fieldValues: z.array(z.record(z.any())).optional(),
  }),
});

export const dataUpdateContactSchema = dataAddContactSchema.deepPartial();

export const addOrUpdateContactResultSchema = z.object({
  fieldValues: z.array(
    z.object({
      contact: z.string(),
      field: z.string(),
      value: z.string(),
      cdate: z.string(),
      udate: z.string(),
      links: z.object({
        owner: z.string(),
        field: z.string(),
      }),
      id: z.string(),
      owner: z.string(),
    }),
  ),
  contact: z.object({
    email: z.string(),
    cdate: z.string(),
    udate: z.string(),
    orgid: z.string(),
    links: z.object({
      bounceLogs: z.string(),
      contactAutomations: z.string(),
      contactData: z.string(),
      contactGoals: z.string(),
      contactLists: z.string(),
      contactLogs: z.string(),
      contactTags: z.string(),
      contactDeals: z.string(),
      deals: z.string(),
      fieldValues: z.string(),
      geoIps: z.string(),
      notes: z.string(),
      organization: z.string(),
      plusAppend: z.string(),
      trackingLogs: z.string(),
      scoreValues: z.string(),
    }),
    id: z.string(),
    organization: z.string(),
  }),
}).deepPartial();

export const dealsSchema = z.object({
  deals: z.array(
    z.object({
      owner: z.string().optional(),
      contact: z.string().optional(),
      organization: z.string().optional(),
      group: z.string().optional(),
      stage: z.string().optional(),
      title: z.string(),
      description: z.string().optional(),
      percent: z.string().optional(),
      cdate: z.string().optional(),
      mdate: z.string().optional(),
      nextdate: z.string().optional(),
      nexttaskid: z.string().optional(),
      value: z.string().optional(),
      currency: z.string().optional(),
      winProbability: z.number().optional(),
      winProbabilityMdate: z.string().optional(),
      status: z.string().optional(),
      activitycount: z.string().optional(),
      nextdealid: z.string().optional(),
      edate: z.string().optional(),
      links: z
        .object({
          dealActivities: z.string(),
          contact: z.string(),
          contactDeals: z.string(),
          group: z.string(),
          nextTask: z.string(),
          notes: z.string(),
          account: z.string().optional(),
          customerAccount: z.string().optional(),
          organization: z.string(),
          owner: z.string(),
          scoreValues: z.string(),
          stage: z.string(),
          tasks: z.string(),
          dealCustomFieldData: z.string().optional(),
        })
        .optional(),
      id: z.string(),
      isDisabled: z.any(),
      account: z.string().optional(),
      customerAccount: z.string().optional(),
      hash: z.string().optional(),
      nextTask: z.string().optional(),
    }),
  ),
  meta: z.object({
    currencies: z.object({
      USD: z.object({
        currency: z.string(),
        total: z.string(),
        value: z.string(),
      }),
    }),
    total: z.number(),
  }),
}).deepPartial();

export const filterDealsSchema = z.object({
  filters: z
    .object({
      search: z.string().optional(),
      search_field: z.string().optional(),
      title: z.string().optional(),
      stage: z.number().optional(),
      group: z.number().optional(),
      status: z.number().optional(),
      owner: z.number().optional(),
      nextdate_range: z.string().optional(),
      tag: z.string().optional(),
      tasktype: z.string().optional(),
      created_before: z.date().optional(),
      created_after: z.date().optional(),
      updated_before: z.date().optional(),
      updated_after: z.date().optional(),
      organization: z.number().optional(),
      minimum_value: z.number().optional(),
      maximum_value: z.number().optional(),
      score_greater_than: z.string().optional(),
      score_less_than: z.string().optional(),
      score: z.string().optional(),
    })
    .optional(),
  orders: z
    .object({
      title: z.string().optional(),
      value: z.string().optional(),
      cdate: z.string().optional(),
      contact_name: z.string().optional(),
      contact_orgname: z.string().optional(),
      next_action: z.string().optional(),
    })
    .optional(),
});

export const accountsSchema = z.object({
  accounts: z.array(
    z.object({
      name: z.string(),
      accountUrl: z.any(),
      createdTimestamp: z.string(),
      updatedTimestamp: z.string(),
      contactCount: z.string(),
      dealCount: z.string(),
      links: z.object({
        notes: z.string(),
        accountCustomFieldData: z.string(),
        accountContacts: z.string(),
      }),
      id: z.string(),
    }),
  ),
  meta: z.object({
    total: z.string(),
  }),
}).deepPartial();

export const queryAccountsSchema = z.object({
  search: z.string().optional(),
  count_deals: z.boolean().optional(),
});

export const usersSchema = z.object({
  users: z.array(
    z.object({
      username: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      phone: z.string(),
      signature: z.any(),
      links: z.object({
        lists: z.string(),
        userGroup: z.string(),
        dealGroupTotals: z.string(),
        dealGroupUsers: z.string(),
        configs: z.string(),
      }),
      id: z.string(),
    }),
  ),
  meta: z.object({
    total: z.string(),
  }),
}).deepPartial();

export const dataAddUserSchema = z.object({
  user: z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    group: z.number().optional(),
    password: z.string().optional(),
  })
    .optional(),
});

export const addUserResultSchema = z.object({
  user: z.object({
    username: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    lang: z.string(),
    localZoneid: z.string(),
    cdate: z.string(),
    udate: z.string(),
    links: z.object({
      lists: z.string(),
      userGroup: z.string(),
      dealGroupTotals: z.string(),
      dealGroupUsers: z.string(),
      configs: z.string(),
      dealConnection: z.string(),
      userConversationsPermission: z.string(),
      seatUser: z.string(),
    }),
    id: z.string(),
  }),
}).deepPartial();

// types:

export type Contact = z.infer<typeof contactSchema>;
export type Contacts = z.infer<typeof contactsSchema>;
export type QueryContacts = z.infer<typeof queryContactsSchema>;
export type DataAddContact = z.infer<typeof dataAddContactSchema>;
export type DataUpdateContact = z.infer<typeof dataUpdateContactSchema>;
export type AddOrUpdateContactResult = z.infer<
  typeof addOrUpdateContactResultSchema
>;
export type Deals = z.infer<typeof dealsSchema>;
export type FilterDeals = z.infer<typeof filterDealsSchema>;
export type Accounts = z.infer<typeof accountsSchema>;
export type QueryAccounts = z.infer<typeof queryAccountsSchema>;
export type Users = z.infer<typeof usersSchema>;
export type DataAddUser = z.infer<typeof dataAddUserSchema>;
export type AddUserResult = z.infer<typeof addUserResultSchema>;
