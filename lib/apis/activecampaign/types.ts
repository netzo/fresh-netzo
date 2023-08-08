export interface Contacts {
  scoreValues: Array<any>;
  contacts: Array<{
    cdate: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    orgid: string;
    segmentio_id: string;
    bounced_hard: string;
    bounced_soft: string;
    bounced_date?: string;
    ip: string;
    ua?: string;
    hash: string;
    socialdata_lastcheck?: string;
    email_local: string;
    email_domain: string;
    sentcnt: string;
    rating_tstamp?: string;
    gravatar: string;
    deleted: string;
    anonymized: string;
    udate: string;
    deleted_at?: string;
    scoreValues: Array<any>;
    links: {
      bounceLogs: string;
      contactAutomations: string;
      contactData: string;
      contactGoals: string;
      contactLists: string;
      contactLogs: string;
      contactTags: string;
      contactDeals: string;
      deals: string;
      fieldValues: string;
      geoIps: string;
      notes: string;
      organization: string;
      plusAppend: string;
      trackingLogs: string;
      scoreValues: string;
    };
    id: string;
    organization: any;
    adate?: string;
    edate?: string;
  }>;
  meta: {
    total: string;
    page_input: {
      segmentid: number;
      formid: number;
      listid: number;
      tagid: number;
      limit: number;
      offset: number;
      search: any;
      sort: any;
      seriesid: number;
      waitid: number;
      status: number;
      forceQuery: number;
      cacheid: string;
    };
  };
}

export interface Contact {
  contactAutomations: Array<{
    contact: string;
    seriesid: string;
    startid: string;
    status: string;
    adddate: string;
    remdate: any;
    timespan: any;
    lastblock: string;
    lastdate: string;
    completedElements: string;
    totalElements: string;
    completed: number;
    completeValue: number;
    links: {
      automation: string;
      contact: string;
      contactGoals: string;
    };
    id: string;
    automation: string;
  }>;
  contactLists: Array<{
    contact: string;
    list: string;
    form: any;
    seriesid: string;
    sdate: any;
    udate: any;
    status: string;
    responder: string;
    sync: string;
    unsubreason: any;
    campaign: any;
    message: any;
    first_name: string;
    last_name: string;
    ip4Sub: string;
    sourceid: string;
    autosyncLog: any;
    ip4_last: string;
    ip4Unsub: string;
    unsubscribeAutomation: any;
    links: {
      automation: string;
      list: string;
      contact: string;
      form: string;
      autosyncLog: string;
      campaign: string;
      unsubscribeAutomation: string;
      message: string;
    };
    id: string;
    automation: any;
  }>;
  deals: Array<{
    owner: string;
    contact: string;
    organization: any;
    group: any;
    title: string;
    nexttaskid: string;
    currency: string;
    status: string;
    links: {
      activities: string;
      contact: string;
      contactDeals: string;
      group: string;
      nextTask: string;
      notes: string;
      organization: string;
      owner: string;
      scoreValues: string;
      stage: string;
      tasks: string;
    };
    id: string;
    nextTask: any;
  }>;
  fieldValues: Array<{
    contact: string;
    field: string;
    value: any;
    cdate: string;
    udate: string;
    links: {
      owner: string;
      field: string;
    };
    id: string;
    owner: string;
  }>;
  geoAddresses: Array<{
    ip4: string;
    country2: string;
    country: string;
    state: string;
    city: string;
    zip: string;
    area: string;
    lat: string;
    lon: string;
    tz: string;
    tstamp: string;
    links: Array<any>;
    id: string;
  }>;
  geoIps: Array<{
    contact: string;
    campaignid: string;
    messageid: string;
    geoaddrid: string;
    ip4: string;
    tstamp: string;
    geoAddress: string;
    links: {
      geoAddress: string;
    };
    id: string;
  }>;
  contact: {
    cdate: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    orgid: string;
    segmentio_id: string;
    bounced_hard: string;
    bounced_soft: string;
    bounced_date: any;
    ip: string;
    ua: any;
    hash: string;
    socialdata_lastcheck: any;
    email_local: string;
    email_domain: string;
    sentcnt: string;
    rating_tstamp: any;
    gravatar: string;
    deleted: string;
    adate: any;
    udate: any;
    edate: any;
    contactAutomations: Array<string>;
    contactLists: Array<string>;
    fieldValues: Array<string>;
    geoIps: Array<string>;
    deals: Array<string>;
    accountContacts: Array<string>;
    links: {
      bounceLogs: string;
      contactAutomations: string;
      contactData: string;
      contactGoals: string;
      contactLists: string;
      contactLogs: string;
      contactTags: string;
      contactDeals: string;
      deals: string;
      fieldValues: string;
      geoIps: string;
      notes: string;
      organization: string;
      plusAppend: string;
      trackingLogs: string;
      scoreValues: string;
    };
    id: string;
    organization: any;
  };
}

export interface QueryContacts {
  ids?: string;
  email?: string;
  email_like?: string;
  exclude?: number;
  formid?: number;
  id_greater?: number;
  id_less?: number;
  listid?: string;
  organization?: number;
  search?: string;
  segmentid?: number;
  seriesid?: number;
  status?: number;
  tagid?: number;
  filters: {
    created_before?: string;
    updated_before?: string;
    updated_after?: string;
  };
  waitid?: number;
  orders: {
    cdate?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    name?: string;
    score?: string;
  };
  in_group_lists?: string;
}

export interface QueryAddContact {
  contact: {
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    fieldValues?: Array<{
      [fieldId: string]: any;
    }>;
  };
}

export type QueryUpdateContact = Partial<QueryAddContact>;

export interface AddOrUpdateContactResponse {
  fieldValues: Array<{
    contact: string;
    field: string;
    value: string;
    cdate: string;
    udate: string;
    links: {
      owner: string;
      field: string;
    };
    id: string;
    owner: string;
  }>;
  contact: {
    email: string;
    cdate: string;
    udate: string;
    orgid: string;
    links: {
      bounceLogs: string;
      contactAutomations: string;
      contactData: string;
      contactGoals: string;
      contactLists: string;
      contactLogs: string;
      contactTags: string;
      contactDeals: string;
      deals: string;
      fieldValues: string;
      geoIps: string;
      notes: string;
      organization: string;
      plusAppend: string;
      trackingLogs: string;
      scoreValues: string;
    };
    id: string;
    organization: string;
  };
}

export interface Deals {
  deals: Array<{
    owner?: string;
    contact?: string;
    organization?: string;
    group?: string;
    stage?: string;
    title: string;
    description?: string;
    percent?: string;
    cdate?: string;
    mdate?: string;
    nextdate?: string;
    nexttaskid?: string;
    value?: string;
    currency?: string;
    winProbability?: number;
    winProbabilityMdate?: string;
    status?: string;
    activitycount?: string;
    nextdealid?: string;
    edate?: string;
    links?: {
      dealActivities: string;
      contact: string;
      contactDeals: string;
      group: string;
      nextTask: string;
      notes: string;
      account?: string;
      customerAccount?: string;
      organization: string;
      owner: string;
      scoreValues: string;
      stage: string;
      tasks: string;
      dealCustomFieldData?: string;
    };
    id: string;
    isDisabled: any;
    account?: string;
    customerAccount?: string;
    hash?: string;
    nextTask?: string;
  }>;
  meta: {
    currencies: {
      USD: {
        currency: string;
        total: string;
        value: string;
      };
    };
    total: number;
  };
}

export interface FilterDeals {
  filters?: {
    search?: string;
    search_field?: string;
    title?: string;
    stage?: number;
    group?: number;
    status?: number;
    owner?: number;
    nextdate_range?: string;
    tag?: string;
    tasktype?: string;
    created_before?: Date;
    created_after?: Date;
    updated_before?: Date;
    updated_after?: Date;
    organization?: number;
    minimum_value?: number;
    maximum_value?: number;
    score_greater_than?: string;
    score_less_than?: string;
    score?: string;
  };
  orders?: {
    title?: string;
    value?: string;
    cdate?: string;
    contact_name?: string;
    contact_orgname?: string;
    next_action?: string; //CHECK
  };
}

export interface Accounts {
  accounts: Array<{
    name: string;
    accountUrl: any;
    createdTimestamp: string;
    updatedTimestamp: string;
    contactCount: string;
    dealCount: string;
    links: {
      notes: string;
      accountCustomFieldData: string;
      accountContacts: string;
    };
    id: string;
  }>;
  meta: {
    total: string;
  };
}

export interface QueryAccounts {
  search?: string;
  count_deals?: boolean;
}

export interface Users {
  users: Array<{
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    signature: any;
    links: {
      lists: string;
      userGroup: string;
      dealGroupTotals: string;
      dealGroupUsers: string;
      configs: string;
    };
    id: string;
  }>;
  meta: {
    total: string;
  };
}

export interface QueryAddUser {
  user?: {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    group?: number;
    password?: string;
  };
}

export interface AddUserResponse {
  user: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    lang: string;
    localZoneid: string;
    cdate: string;
    udate: string;
    links: {
      lists: string;
      userGroup: string;
      dealGroupTotals: string;
      dealGroupUsers: string;
      configs: string;
      dealConnection: string;
      userConversationsPermission: string;
      seatUser: string;
    };
    id: string;
  };
}
