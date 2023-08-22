export interface Site {
  version: string;
  properties: {
    categories: {
      primary: string;
      secondary: Array<string>;
    };
    locale: {
      languageCode: string;
      country: string;
    };
    language: string;
    paymentCurrency: string;
    timeZone: string;
    email: string;
    phone: string;
    fax: string;
    address: {};
    siteDisplayName: string;
    businessName: string;
    businessConfig: string;
    logo: string;
    description: string;
    businessSchedule: {
      periods: Array<{}>;
      specialHourPeriod: Array<{}>;
    };
    multilingual: {
      supportedLanguages: Array<{}>;
      autoRedirect: boolean;
    };
    consentPolicy: {
      essential: boolean;
      functional: boolean;
      analytics: boolean;
      advertising: boolean;
      dataToThirdParty: boolean;
    };
    externalSiteUrl: string;
    trackClicksAnalytics: boolean;
  };
}

export interface QuerySite {
  fields?: {
    paths?: Array<string>;
  };
}

interface ContactBase {
  id: string;
  revision: number;
  source: {
    sourceType: string;
    appId: string;
  };
  createdDate: string;
  updatedDate: string;
  lastActivity: {
    activityDate: string;
    activityType: string;
  };
  primaryInfo: {
    email: string;
    phone: string;
  };
  picture: {
    id: string;
    url: string;
    height: number;
    width: number;
  };
  info: {
    name: {
      first: string;
      last: string;
    };
    emails: {
      items: Array<{
        id: string;
        tag: string;
        email: string;
        primary: boolean;
      }>;
    };
    phones: {
      items: Array<{
        id: string;
        tag: string;
        countryCode: string;
        phone: string;
        e164Phone: string;
        primary: boolean;
      }>;
    };
    addresses: {
      items: Array<{
        id: string;
        tag: string;
        address: {
          country: string;
          subdivision: string;
          city: string;
          postalCode: string;
          addressLine?: string;
          addressLine2: string;
          streetAddress?: {
            number: string;
            name: string;
          };
        };
      }>;
    };
    company: string;
    jobTitle: string;
    birthdate: string;
    locale: string;
    labelKeys: {
      items: Array<string>;
    };
    extendedFields: {
      items: {};
    };
    locations: {
      items: Array<string>;
    };
  };
}

export interface Contact {
  contact: ContactBase;
}

export interface Contacts {
  contacts: Array<ContactBase>;
  pagingMetadata: {
    count: number;
    offset: number;
    total: number;
  };
}

export interface QueryContacts {
  sort?: {
    fieldName?: string;
    order?: "ASC" | "DESC";
  };
  paging?: {
    limit?: number;
    offset?: number;
  };
  fields?: Array<string>;
  fieldsets?: Array<string>;
}

export interface QueryAddContact {
  info: {
    name?: {
      first?: string;
      last?: string;
    };
    emails?: {
      items?: Array<{
        tag?: string;
        email?: string;
        primary?: boolean;
      }>;
    };
    phones?: {
      items?: Array<{
        tag?: string;
        countryCode?: string;
        phone?: string;
        primary?: boolean;
      }>;
    };
    addresses?: {
      items?: Array<{
        tag?: string;
        address?: {};
      }>;
    };
    company?: string;
    jobTitle?: string;
    birthdate?: string;
    locale?: string;
    labelKeys?: {
      items?: Array<{}>;
    };
    extendedFields?: {
      items?: {
        [key: string]: any;
      };
    };
    picture?: {
      image?: {};
    };
  };
  allowDuplicates?: boolean;
}

export interface QueryUpdateContact extends QueryAddContact {
  revision: number;
}
