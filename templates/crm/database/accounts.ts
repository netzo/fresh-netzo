import { z } from "netzo/deps/zod/mod.ts";

// schemas:

export const accountSchema = z.object({
  id: z.string(),
  type: z.string(), // "prospect" | "customer" | "supplier" | "partner" | "other"
  legalName: z.string(),
  tradeName: z.string(),
  emails: z.array(
    z.object({
      type: z.string(), // "contact", "sales", "billing"
      name: z.string(), // "Sales department", "Billing department"
      value: z.string().email(),
    })),
  phones: z.array(
    z.object({
      type: z.string(), // "contact", "sales", "billing"
      name: z.string(), // "Sales department", "Billing department"
      value: z.string(),
    })),
  website: z.string().url(),
  taxInfo: z.object({
    taxId: z.string(),
    isMexTaxId: z.boolean(),
    fiscalRegime: z.string(),
    proofTaxSituation: z.string(),
    proofTaxSituationDate: z.string(),
    proofTaxSituationPdf: z.string(),
    billingAddress: z.object({
      street: z.string(),
      numberExterior: z.string(),
      numberInterior: z.string(),
      neighborhood: z.string(),
      city: z.string(),
      district: z.string(),
      zipCode: z.string(),
      state: z.string(),
      countryCode: z.string(),
    })
  }),
  links: z.array(
    z.object({
      name: z.string(), // "website", "facebook", "linkedin", "twitter", "other"
      value: z.string().url(),
    })
  ),
  notes: z.array(
    z.object({
      text: z.string(),
      createdBy: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  ),
  shippingAddresses: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      note: z.string(),
      street: z.string(),
      numberExterior: z.string(),
      numberInterior: z.string(),
      neighborhood: z.string(),
      city: z.string(),
      district: z.string(),
      zipCode: z.string(),
      state: z.string(),
      countryCode: z.string(),
    }),
  ),
  bankAccounts: z.array(
    z.object({
      name: z.string(),
      currency: z.string(),
      type: z.string(),
      beneficiary: z.string(),
      number: z.string(),
      clabe: z.string(),
      swift: z.string(),
      iban: z.string(),
      bank: z.object({
        name: z.string(),
        city: z.string(),
        code: z.string(),
        country: z.string(),
      }),
      other: z.string(),
    })),
  defaults: z.object({
    expensesAccount: z.number(),
    language: z.string(),
    currency: z.string(),
    paymentMethod: z.string(),
    paymentForm: z.string(),
    paymentDeadline: z.string(),
    paymentTerms: z.string(),
  }),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// types:

export type Account = z.infer<typeof accountSchema>;

// data:

export const accounts: Account[] = [
  {
    id: "ACCOUNT1",
    type: "customer",
    legalName: "ABC Company",
    tradeName: "ABC Corp",
    emails: [{
      type: "sales",
      name: "Sales department",
      value: "sales@abc.com"
    },
    {
      type: "billing",
      name: "Billing department",
      value: "billing@abc.com"
    }],
    phones: [{
      type: "sales",
      name: "Sales department",
      value: "+1 123 456 7890"
    },
    {
      type: "billing",
      name: "Billing department",
      value: "+1 123 456 7890"
    }],
    website: "https://www.abccompany.com",
    taxInfo: {
      taxId: "123456789",
      isMexTaxId: true,
      fiscalRegime: "Regime 1",
      proofTaxSituation: "Proof 1",
      proofTaxSituationDate: "2023-01-01",
      proofTaxSituationPdf: "https://www.abccompany.com/docs/prooftax.pdf",
      billingAddress: {
        street: "Main Street",
        numberExterior: "123",
        numberInterior: "Apt 101",
        neighborhood: "Downtown",
        city: "Cityville",
        district: "District 1",
        zipCode: "12345",
        state: "State 1",
        countryCode: "US",
      },
    },
    links: [
      { name: "facebook", value: "https://www.facebook.com/abccompany" },
      { name: "instagram", value: "https://www.instagram.com/abccompany" },
      { name: "linkedin", value: "https://www.linkedin.com/company/abccompany" },
    ],
    notes: [
      {
        text: "Note 1",
        createdBy: "USER1",
        createdAt: "2023-02-15T10:00:00.000Z",
        updatedAt: "2023-02-15T10:00:00.000Z",
      },
    ],
    shippingAddresses: [
      {
        title: "Main Office",
        description: "Headquarters",
        note: "Do not ship on weekends",
        street: "Headquarter Street",
        numberExterior: "456",
        numberInterior: "Floor 5",
        neighborhood: "Downtown",
        city: "Cityville",
        district: "District 1",
        zipCode: "12345",
        state: "State 1",
        countryCode: "US",
      },
    ],
    bankAccounts: [
      {
        name: "Account 1",
        currency: "USD",
        type: "Checking",
        beneficiary: "ABC Company",
        number: "1234567890",
        clabe: "123456789012345678",
        swift: "ABCDEF12345",
        iban: "IBAN123456",
        bank: {
          name: "Bank of ABC",
          city: "Cityville",
          code: "BANK123",
          country: "US",
        },
        other: "Additional info",
      },
    ],
    defaults: {
      expensesAccount: 789,
      language: "en-US",
      currency: "USD",
      paymentMethod: "Credit Card",
      paymentForm: "Online",
      paymentDeadline: "30 days",
      paymentTerms: "NET_30",
    },
    createdBy: "USER1",
    createdAt: "2021-01-01T10:00:00.000Z",
    updatedAt: "2021-01-01T10:00:00.000Z",
  },
  {
    id: "ACCOUNT2",
    type: "partner",
    legalName: "ABC Company",
    tradeName: "ABC Corp",
    emails: [{
      type: "sales",
      name: "Sales department",
      value: "sales@abc.com"
    },
    {
      type: "billing",
      name: "Billing department",
      value: "billing@abc.com"
    }],
    phones: [{
      type: "sales",
      name: "Sales department",
      value: "+1 123 456 7890"
    },
    {
      type: "billing",
      name: "Billing department",
      value: "+1 123 456 7890"
    }],
    website: "https://www.abccompany.com",
    taxInfo: {
      taxId: "123456789",
      isMexTaxId: true,
      fiscalRegime: "Regime 1",
      proofTaxSituation: "Proof 1",
      proofTaxSituationDate: "2023-01-01",
      proofTaxSituationPdf: "https://www.abccompany.com/docs/prooftax.pdf",
      billingAddress: {
        street: "Main Street",
        numberExterior: "123",
        numberInterior: "Apt 101",
        neighborhood: "Downtown",
        city: "Cityville",
        district: "District 1",
        zipCode: "12345",
        state: "State 1",
        countryCode: "US",
      },
    },
    links: [
      { name: "facebook", value: "https://www.facebook.com/abccompany" },
      { name: "instagram", value: "https://www.instagram.com/abccompany" },
      { name: "linkedin", value: "https://www.linkedin.com/company/abccompany" },
    ],
    notes: [
      {
        text: "Note 1",
        createdBy: "USER1",
        createdAt: "2023-02-15T10:00:00.000Z",
        updatedAt: "2023-02-15T10:00:00.000Z",
      },
    ],
    shippingAddresses: [
      {
        title: "Main Office",
        description: "Headquarters",
        note: "Do not ship on weekends",
        street: "Headquarter Street",
        numberExterior: "456",
        numberInterior: "Floor 5",
        neighborhood: "Downtown",
        city: "Cityville",
        district: "District 1",
        zipCode: "12345",
        state: "State 1",
        countryCode: "US",
      },
    ],
    bankAccounts: [
      {
        name: "Account 1",
        currency: "USD",
        type: "Checking",
        beneficiary: "ABC Company",
        number: "1234567890",
        clabe: "123456789012345678",
        swift: "ABCDEF12345",
        iban: "IBAN123456",
        bank: {
          name: "Bank of ABC",
          city: "Cityville",
          code: "BANK123",
          country: "US",
        },
        other: "Additional info",
      },
    ],
    defaults: {
      expensesAccount: 789,
      language: "en-US",
      currency: "USD",
      paymentMethod: "Credit Card",
      paymentForm: "Online",
      paymentDeadline: "30 days",
      paymentTerms: "NET_30",
    },
    createdBy: "USER1",
    createdAt: "2021-01-01T10:00:00.000Z",
    updatedAt: "2021-01-01T10:00:00.000Z",
  },
  {
    id: "ACCOUNT3",
    type: "supplier",
    legalName: "ABC Company",
    tradeName: "ABC Corp",
    emails: [{
      type: "sales",
      name: "Sales department",
      value: "sales@abc.com"
    },
    {
      type: "billing",
      name: "Billing department",
      value: "billing@abc.com"
    }],
    phones: [{
      type: "sales",
      name: "Sales department",
      value: "+1 123 456 7890"
    },
    {
      type: "billing",
      name: "Billing department",
      value: "+1 123 456 7890"
    }],
    website: "https://www.abccompany.com",
    taxInfo: {
      taxId: "123456789",
      isMexTaxId: true,
      fiscalRegime: "Regime 1",
      proofTaxSituation: "Proof 1",
      proofTaxSituationDate: "2023-01-01",
      proofTaxSituationPdf: "https://www.abccompany.com/docs/prooftax.pdf",
      billingAddress: {
        street: "Main Street",
        numberExterior: "123",
        numberInterior: "Apt 101",
        neighborhood: "Downtown",
        city: "Cityville",
        district: "District 1",
        zipCode: "12345",
        state: "State 1",
        countryCode: "US",
      },
    },
    links: [
      { name: "facebook", value: "https://www.facebook.com/abccompany" },
      { name: "instagram", value: "https://www.instagram.com/abccompany" },
      { name: "linkedin", value: "https://www.linkedin.com/company/abccompany" },
    ],
    notes: [
      {
        text: "Note 1",
        createdBy: "USER1",
        createdAt: "2023-02-15T10:00:00.000Z",
        updatedAt: "2023-02-15T10:00:00.000Z",
      },
    ],
    shippingAddresses: [
      {
        title: "Main Office",
        description: "Headquarters",
        note: "Do not ship on weekends",
        street: "Headquarter Street",
        numberExterior: "456",
        numberInterior: "Floor 5",
        neighborhood: "Downtown",
        city: "Cityville",
        district: "District 1",
        zipCode: "12345",
        state: "State 1",
        countryCode: "US",
      },
    ],
    bankAccounts: [
      {
        name: "Account 1",
        currency: "USD",
        type: "Checking",
        beneficiary: "ABC Company",
        number: "1234567890",
        clabe: "123456789012345678",
        swift: "ABCDEF12345",
        iban: "IBAN123456",
        bank: {
          name: "Bank of ABC",
          city: "Cityville",
          code: "BANK123",
          country: "US",
        },
        other: "Additional info",
      },
    ],
    defaults: {
      expensesAccount: 789,
      language: "en-US",
      currency: "USD",
      paymentMethod: "Credit Card",
      paymentForm: "Online",
      paymentDeadline: "30 days",
      paymentTerms: "NET_30",
    },
    createdBy: "USER1",
    createdAt: "2021-01-01T10:00:00.000Z",
    updatedAt: "2021-01-01T10:00:00.000Z",
  },
];

// i18n:

export const ALIASES = {
  "id": "Account Id",
  "type": "Type",
  "legalName": "Legal Name",
  "tradeName": "Trade Name",
  "email": "Emails",
  "phones": "Phones",
  "website": "Website",
  "taxInfo": {
    "taxId": "Tax ID",
    "isMexTaxId": "Mexican Tax ID",
    "fiscalRegime": "Fiscal Regime",
    "proofTaxSituation": "Proof of Tax Situation",
    "proofTaxSituationDate": "Proof of Tax Situation Date",
    "proofTaxSituationPdf": "Proof of Tax Situation PDF",
    "billingAddress": {
      "street": "Street",
      "numberExterior": "Number (Exterior)",
      "numberInterior": "Number (Interior)",
      "neighborhood": "Neighborhood",
      "city": "City",
      "district": "District",
      "zipCode": "ZIP Code",
      "state": "State",
      "countryCode": "Country Code"
    }
  },
  "links": "Links",
  "portals": [
    {
      "type": "Type (Supplier, Customer, Other)",
      "title": "Title",
      "descripcion": "Description",
      "url": "URL",
      "username": "Username",
      "password": "Password"
    }
  ],
  "notes": [
    {
      "text": "Text",
      "createdBy": "Created At",
      "createdAt": "Created At",
      "updatedAt": "Updated At",
    }
  ],
  "shippingAddresses": [
    {
      "title": "Title",
      "description": "Description",
      "note": "Note",
      "street": "Street",
      "numberExterior": "Number (Exterior)",
      "numberInterior": "Number (Interior)",
      "neighborhood": "Neighborhood",
      "city": "City",
      "district": "District",
      "zipCode": "ZIP Code",
      "state": "State",
      "countryCode": "Country Code"
    }
  ],
  "bankAccounts": [
    {
      "name": "Name",
      "currency": "Currency",
      "type": "Type",
      "beneficiary": "Beneficiary",
      "number": "Number",
      "clabe": "CLABE",
      "swift": "SWIFT",
      "iban": "IBAN",
      "bank": {
        "name": "Name",
        "city": "City",
        "code": "Code",
        "country": "Country"
      },
      "info": "Info"
    }
  ],
  "defaults": {
    "expensesAccount": "Expenses Account",
    "language": "Language",
    "currency": "Currency",
    "paymentMethod": "Payment Method",
    "paymentForm": "Payment Form",
    "paymentDeadline": "Payment Deadline",
    "paymentTerms": "Payment Terms"
  },
  "createdBy": "Created By",
  "createdAt": "Created At",
  "updatedAt": "Updated At",
};