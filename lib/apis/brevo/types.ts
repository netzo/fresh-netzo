interface BrevoPagination {
  limit?: number;
  offset?: number;
  sort?: "asc" | "desc";
}

interface ContactBase {
  email: string;
  id: number;
  emailBlacklisted: boolean;
  smsBlacklisted: boolean;
  createdAt: string;
  modifiedAt: string;
  listIds: Array<number>;
  attributes: {
    [KEY: string]: any;
  };
}

export interface Contacts {
  contacts: Array<ContactBase>;
  count: number;
}

export interface QueryContacts extends BrevoPagination {
  modifiedSince?: string;
  createdSince?: string;
}

export interface QueryContact {
  startDate?: string;
  endDate?: string;
}

export interface Contact extends ContactBase {
  listIds: Array<number>;
  statistics: {
    messagesSent: Array<{
      campaignId: number;
      eventTime: string;
    }>;
    opened: Array<{
      campaignId: number;
      count: number;
      eventTime: string;
      ip: string;
    }>;
    clicked: Array<{
      campaignId: number;
      links: Array<{
        count: number;
        eventTime: string;
        ip: string;
        url: string;
      }>;
    }>;
    delivered: Array<{
      campaignId: number;
      count: number;
      eventTime: string;
      ip: string;
    }>;
  };
}

export interface QueryAddContact {
  email?: string;
  ext_id?: string;
  attributes?: {
    [KEY: string]: any;
  };
  emailBlacklisted?: boolean;
  smsBlacklisted?: boolean;
  listIds?: Array<number>;
  updateEnabled?: boolean;
  smtpBlacklistSender?: Array<string>;
}

export interface QueryUpdateContact
  extends Omit<QueryAddContact, "email" | "updateEnabled"> {
  unlinkListIds?: Array<number>;
}

export interface EmailCampaigns {
  count: number;
  campaigns: Array<{
    id: number;
    name: string;
    subject: string;
    previewText: string;
    type: string;
    status: string;
    scheduledAt: string;
    testSent: boolean;
    header: string;
    footer: string;
    sender: {
      email: string;
      name: string;
      id: number;
    };
    replyTo: string;
    toField: string;
    htmlContent: string;
    shareLink: string;
    tag: string;
    createdAt: string;
    modifiedAt: string;
    inlineImageActivation: boolean;
    mirrorActive: boolean;
    recurring: boolean;
    recipients: {
      lists: Array<number>;
      exclusionLists: Array<number>;
    };
    statistics: {
      globalStats: {
        uniqueClicks: number;
        clickers: number;
        complaints: number;
        delivered: number;
        sent: number;
        softBounces: number;
        hardBounces: number;
        uniqueViews: number;
        trackableViews: number;
        trackableViewsRate: number;
        estimatedViews: number;
        unsubscriptions: number;
        viewed: number;
      };
      campaignStats: Array<{
        listId: number;
        uniqueClicks: number;
        clickers: number;
        complaints: number;
        delivered: number;
        sent: number;
        softBounces: number;
        hardBounces: number;
        uniqueViews: number;
        trackableViews: number;
        unsubscriptions: number;
        viewed: number;
        deferred: number;
      }>;
      mirrorClick: number;
      remaining: number;
      linksStats: {
        [link: string]: any;
      };
      statsByDomain: {
        [domain: string]: {
          uniqueClicks: number;
          clickers: number;
          complaints: number;
          sent: number;
          softBounces: number;
          hardBounces: number;
          uniqueViews: number;
          unsubscriptions: number;
          viewed: number;
          delivered: number;
        };
      };
    };
  }>;
}

export interface QueryEmailCampaigns extends BrevoPagination {
  type?: "classic" | "trigger";
  status?: "suspended" | "archive" | "sent" | "queued" | "draft" | "inProcess";
  statistics?: "globalStats" | "linksStats" | "statsByDomain";
  startDate?: string;
  endDate?: string;
  excludeHtmlContent?: boolean;
}

export interface Companies {
  items: Array<{
    id: string;
    attributes: {
      created_at: string;
      domain: string;
      last_updated_at: string;
      name: string;
      number_of_contacts: number;
      owner: string;
      owner_assign_date: string;
      phone_number: number;
      revenue: number;
    };
    linkedContactsIds: Array<number>;
    linkedDealsIds: Array<string>;
  }>;
}

export interface QueryCompanies extends Omit<BrevoPagination, "offset"> {
  filters?: string;
  linkedContactsIds?: number;
  linkedDealsIds?: string;
  page?: number;
  sortBy?: string;
}
