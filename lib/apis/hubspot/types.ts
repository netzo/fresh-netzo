export interface Contact {
  properties: {
    company: string;
    createdate: string;
    email: string;
    firstname: string;
    lastmodifieddate: string;
    lastname: string;
    phone: string;
    website: string;
  };
}

export interface QueryContacts {
  limit?: number;
  after?: string;
  properties?: [];
}

export interface QueryAddContact {
  properties?: Partial<
    Omit<Contact["properties"], "createdate" | "lastmodifieddate">
  >;
}

export interface AddContactResponse extends Contact {
  id: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}

export interface Form {
  portalId: number;
  guid: string;
  name: string;
  action: string;
  method: string;
  cssClass: string;
  redirect: string;
  submitText: string;
  followUpId: string;
  notifyRecipients: string;
  leadNurturingCampaignId: string;
  formFieldGroups: Array<{
    fields: Array<{
      name: string;
      label: string;
      type: string;
      fieldType: string;
      description: string;
      groupName: string;
      displayOrder: number;
      required: boolean;
      selectedOptions: Array<any>;
      options: Array<any>;
      validation: {
        name: string;
        message: string;
        data: string;
        useDefaultBlockList: boolean;
        blockedEmailAddresses: Array<any>;
      };
      enabled: boolean;
      hidden: boolean;
      defaultValue: string;
      isSmartField: boolean;
      unselectedLabel: string;
      placeholder: string;
      dependentFieldFilters: Array<any>;
      labelHidden: boolean;
    }>;
    default: boolean;
    isSmartGroup: boolean;
    richText: {
      content: string;
    };
  }>;
  createdAt: number;
  updatedAt: number;
  performableHtml: string;
  migratedFrom: string;
  ignoreCurrentValues: boolean;
  metaData: Array<any>;
  deletable: boolean;
  inlineMessage: string;
  tmsId: string;
  captchaEnabled: boolean;
  campaignGuid: string;
  cloneable: boolean;
  editable: boolean;
  formType: string;
}

export interface QueryForms {
  limit?: number;
  offset?: number;
  formTypes?: "ALL";
}

export interface FormSubmission {
  submittedAt: number;
  values: Array<{
    name: string;
    value: string;
  }>;
  pageUrl?: string;
}

export interface QuerySubmissions {
  limit?: number;
  after?: string;
}

export interface QueryDeals {
  limit?: number;
  after?: string;
  properties?: string[];
}

export interface Deal {
  properties: {
    amount: string;
    closedate: string;
    createdate: string;
    dealname: string;
    dealstage: string;
    hs_lastmodifieddate: string;
    hubspot_owner_id: string;
    pipeline: string;
  };
}

export interface QueryAddDeal {
  properties?: {
    amount?: string;
    closedate?: string;
    dealname?: string;
    dealstage?: string;
    hubspot_owner_id?: string;
    pipeline?: string;
  };
  associations?: Array<{
    to?: {
      id?: string;
    };
    types?: Array<{
      associationCategory?: string;
      associationTypeId?: number;
    }>;
  }>;
}

export interface AddDealResponse extends Deal {
  id: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}
