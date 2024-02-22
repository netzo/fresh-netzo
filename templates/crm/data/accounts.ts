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
  tags: z.array(z.string()),
  legalName: z.string(),
  emails: z.array(z.object({
    name: z.string(),
    value: z.string().email(),
  })),
  phones: z.array(z.object({
    name: z.string(),
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
    }),
  }),
  links: z.array(z.object({
    name: z.string(),
    value: z.string().url(),
  })),
  notes: z.array(z.object({
    text: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })),
  shippingAddresses: z.array(z.object({
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
  })),
  bankAccounts: z.array(z.object({
    name: z.string(),
    currencyCode: z.string(),
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
  tags: Array.from(Array(3)).map(() => faker.lorem.word()),
  legalName: faker.company.name(),
  emails: [
    {
      name: "Contact",
      value: faker.internet.email().toLowerCase(),
    },
    {
      name: "Sales",
      value: faker.internet.email().toLowerCase(),
    },
    {
      name: "Billing",
      value: faker.internet.email().toLowerCase(),
    },
  ],
  phones: [
    {
      name: "Contact",
      value: faker.phone.number(),
    },
    {
      name: "Sales",
      value: faker.phone.number(),
    },
    {
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
      currencyCode: "USD",
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
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
});

// i18n:

export const I18N = {
  "id": "Account ID",
  "type": "Type",
  "name": "Name",
  "tags": "Tags",
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
  "createdAt": "Created At",
  "updatedAt": "Updated At",
};
