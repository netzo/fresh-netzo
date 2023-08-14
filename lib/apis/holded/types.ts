export interface Contact {
  id: string;
  customId: string;
  name: string;
  code: string;
  tradeName: string;
  email: string;
  mobile: string;
  phone: string;
  type: string;
  iban: string;
  swift: string;
  clientRecord: number;
  supplierRecord: number;
  billAddress: {
    address: string;
    city: string;
    postalCode: number;
    province: string;
    country: string;
    countryCode: string;
    info: string;
  };
  defaults: {
    salesChannel: number;
    expensesAccount: number;
    dueDays: number;
    paymentMethod: number;
    discount: number;
    language: string;
    currency: string;
    tax: string;
    retention: string;
  };
  socialNetworks: {
    website: string;
  };
  tags: Array<string>;
  notes: Array<{
    noteId: string;
    name: string;
    description: string;
    color: string;
    updatedAt: number;
    userId: string;
  }>;
  contactPersons: Array<{
    personId: string;
    name: string;
    job: string;
    phone: string;
    email: string;
    sendDocumentsByDefault: boolean;
    linkedin: string;
  }>;
  shippingAddresses: Array<{
    shippingId: string;
    name: string;
    address: string;
    city: string;
    postalCode: number;
    province: string;
    country: string;
    countryCode: string;
    notes: string;
    privateNotes: string;
  }>;
  customFields: Array<{
    field: string;
    value: string;
  }>;
}

export interface QueryContacts {
  phone?: string;
  mobile?: string;
  customId?: string[];
}

export interface QueryAddContact {
  CustomId?: string;
  name?: string;
  code?: string;
  email?: string;
  mobile?: string;
  phone?: string;
  type?: "supplier" | "debtor" | "creditor" | "client" | "lead";
  isperson?: boolean;
  iban?: string;
  swift?: string;
  sepaRef?: string;
  groupId?: string;
  taxOperation?: string;
  sepaDate?: number;
  clientRecord?: number;
  supplierRecord?: number;
  billAddress?: {};
  numberingSeries?: {};
  shippingAddresses?: {}[];
  defaults?: {};
  socialNetworks?: {};
  tags?: string[];
  note?: string;
  contactPersons?: {}[];
}

export interface QueryUpdateContact
  extends
    Omit<QueryAddContact, "tags" | "note" | "contacPersons" | "CustomId"> {
  tradeName?: string;
}

export interface ContactResponse {
  status: number;
  info: string;
  id: string;
}
