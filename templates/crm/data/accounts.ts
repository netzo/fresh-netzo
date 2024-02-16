import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";

// schemas:

export const accountSchema = z.object({
  id: z.string(),
  type: z.enum([
    "prospect",
    "customer",
    "supplier",
    "partner",
    "other",
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

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid(),
  type: faker.helpers.arrayElement([
    "prospect",
    "customer",
    "supplier",
    "partner",
    "other",
  ]),
  name: faker.company.name(),
  legalName: faker.company.name(),
  emails: [
    {
      type: "contact",
      name: "Contact",
      value: faker.internet.email(),
    },
    {
      type: "sales",
      name: "Sales",
      value: faker.internet.email(),
    },
    {
      type: "billing",
      name: "Billing",
      value: faker.internet.email(),
    },
  ],
  phones: [
    {
      type: "contact",
      name: "Contact",
      value: faker.phone.number(),
    },
    {
      type: "sales",
      name: "Sales",
      value: faker.phone.number(),
    },
    {
      type: "billing",
      name: "Billing",
      value: faker.phone.number(),
    },
  ],
  website: faker.internet.url(),
  taxInfo: {
    taxId: faker.string.alphanumeric(10),
    isMexTaxId: faker.datatype.boolean(),
    fiscalRegime: faker.lorem.word(),
    proofTaxSituation: faker.lorem.word(),
    proofTaxSituationDate: faker.date.past().toISOString(),
    proofTaxSituationPdf: faker.internet.url(),
    billingAddress: {
      street: faker.location.street(),
      numberExterior: faker.location.streetAddress(),
      numberInterior: faker.location.secondaryAddress(),
      neighborhood: faker.location.county(),
      city: faker.location.city(),
      district: faker.location.state(),
      zipCode: faker.location.zipCode(),
      state: faker.location.state(),
      countryCode: faker.location.countryCode(),
    },
  },
  links: [
    {
      name: "website",
      value: faker.internet.url(),
    },
    {
      name: "facebook",
      value: faker.internet.url(),
    },
    {
      name: "linkedin",
      value: faker.internet.url(),
    },
    {
      name: "twitter",
      value: faker.internet.url(),
    },
    {
      name: "other",
      value: faker.internet.url(),
    },
  ],
  notes: [
    {
      text: faker.lorem.paragraph(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    },
  ],
  shippingAddresses: [
    {
      title: faker.lorem.word(),
      description: faker.lorem.words(),
      note: faker.lorem.words(),
      street: faker.location.street(),
      numberExterior: faker.location.streetAddress(),
      numberInterior: faker.location.secondaryAddress(),
      neighborhood: faker.location.county(),
      city: faker.location.city(),
      district: faker.location.state(),
      zipCode: faker.location.zipCode(),
      state: faker.location.state(),
      countryCode: faker.location.countryCode(),
    },
  ],
  bankAccounts: [
    {
      name: faker.finance.accountName(),
      currency: faker.finance.currencyCode(),
      type: "account",
      beneficiary: faker.finance.accountName(),
      number: faker.finance.accountName(),
      clabe: faker.finance.pin(),
      swift: faker.finance.bic(),
      iban: faker.finance.iban(),
      bank: {
        name: faker.company.name(),
        city: faker.location.city(),
        code: faker.finance.bic(),
        country: faker.location.country(),
      },
      other: faker.lorem.words(),
    },
  ],
  defaults: {
    expensesAccount: faker.finance.accountNumber(),
    language: faker.location.countryCode(),
    currency: faker.finance.currencyCode(),
    paymentMethod: faker.lorem.word(),
    paymentForm: faker.lorem.word(),
    paymentDeadline: faker.lorem.word(),
    paymentTerms: faker.lorem.word(),
  },
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
});

// i18n:

export const I18N = {
  "id": "Account ID",
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
