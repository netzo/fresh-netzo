import { z } from "zod";

// schemas:

export const accountSchema = z.object({
  id: z.string(),
  type: z.union([
    z.literal("prospect"),
    z.literal("customer"),
    z.literal("supplier"),
    z.literal("partner"),
    z.literal("other"),
  ]),
  name: z.string(),
  legalName: z.string(),
  emails: z.array(
    z.object({
      type: z.string(), // "contact", "sales", "billing"
      name: z.string(), // "Sales department", "Billing department"
      value: z.string().email(),
    }),
  ),
  phones: z.array(
    z.object({
      type: z.string(), // "contact", "sales", "billing"
      name: z.string(), // "Sales department", "Billing department"
      value: z.string(),
    }),
  ),
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
    }),
  }),
  links: z.array(
    z.object({
      name: z.string(), // "website", "facebook", "linkedin", "twitter", "other"
      value: z.string().url(),
    }),
  ),
  notes: z.array(
    z.object({
      text: z.string(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
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
    }),
  ),
  defaults: z.object({
    expensesAccount: z.number(),
    language: z.string(),
    currency: z.string(),
    paymentMethod: z.string(),
    paymentForm: z.string(),
    paymentDeadline: z.string(),
    paymentTerms: z.string(),
  }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// types:

export type Account = z.infer<typeof accountSchema>;

// i18n:

export const I18N = {
  "id": "Account Id",
  "type": "Type",
  "name": "Name",
  "legalName": "Legal Name",
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
      "countryCode": "Country Code",
    },
  },
  "links": "Links",
  "portals": [
    {
      "type": "Type (Supplier, Customer, Other)",
      "title": "Title",
      "descripcion": "Description",
      "url": "URL",
      "username": "Username",
      "password": "Password",
    },
  ],
  "notes": [
    {
      "text": "Text",
      "createdAt": "Created At",
      "updatedAt": "Updated At",
    },
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
      "countryCode": "Country Code",
    },
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
        "country": "Country",
      },
      "info": "Info",
    },
  ],
  "defaults": {
    "expensesAccount": "Expenses Account",
    "language": "Language",
    "currency": "Currency",
    "paymentMethod": "Payment Method",
    "paymentForm": "Payment Form",
    "paymentDeadline": "Payment Deadline",
    "paymentTerms": "Payment Terms",
  },
  "createdAt": "Created At",
  "updatedAt": "Updated At",
};
