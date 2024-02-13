import { z } from "zod";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/mod.ts";
import { authenticate, log } from "netzo/plugins/api/hooks/mod.ts";
import { ulid } from "netzo/plugins/api/utils.ts";
import { kv } from "./mod.ts";

export const transactions = defineApiEndpoint({
  name: "transactions",
  idField: "id",
  resource: DenoKvResource({ kv, prefix: ["transactions"] }),
  hooks: {
    all: [authenticate(), log()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});

// schemas:

export const transactionSchema = z.object({
  id: z.string(),
  treasuryIdSource: z.string(),
  treasuryIdDestination: z.string(),
  type: z.enum(["income", "expense", "transfer"]),
  method: z.enum([
    "wire-transfer",
    "check",
    "cash",
    "credit-card",
    "debit-card",
    "paypal",
    "stripe",
  ]),
  status: z.enum(["pending", "completed", "failed", "cancelled", "refunded"]),
  reference: z.string(),
  issuerAccountId: z.string(),
  receiverAccountId: z.string(),
  dateIssued: z.string(),
  datePayment: z.string(),
  amount: z.number(),
  currency: z.string(),
  exchangeRate: z.number(),
  notes: z.array(
    z.object({
      text: z.string(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
  ),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// types:

export type Transaction = z.infer<typeof transactionSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid(),
  treasuryIdSource: ulid(),
  treasuryIdDestination: ulid(),
  type: faker.helpers.arrayElement(["income", "expense", "transfer"]),
  method: faker.helpers.arrayElement([
    "wire-transfer",
    "check",
    "cash",
    "credit-card",
    "debit-card",
    "paypal",
    "stripe",
  ]),
  status: faker.helpers.arrayElement([
    "pending",
    "completed",
    "failed",
    "cancelled",
    "refunded",
  ]),
  reference: faker.lorem.sentence(),
  issuerAccountId: ulid(),
  receiverAccountId: ulid(),
  dateIssued: faker.date.past().toISOString(),
  datePayment: faker.date.recent().toISOString(),
  amount: faker.finance.amount(),
  currency: faker.finance.currencyCode(),
  exchangeRate: faker.number.int(),
  notes: Array.from(Array(3)).map(() => ({
    text: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  })),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
});

// i18n:

export const I18N = {
  id: "Transaction ID",
  treasuryIdSource: "Source Treasury ID",
  treasuryIdDestination: "Destination Treasury ID",
  type: "Type",
  method: "Method",
  status: "Status",
  reference: "Reference",
  issuerAccountId: "issuerAccountId",
  receiverAccountId: "receiverAccountId",
  dateIssued: "Issued Date",
  datePayment: "Payment Date",
  amount: "Amount",
  currency: "Currency",
  exchangeRate: "Exchange Rate",
  notes: {
    text: "Text",
    createdAt: "Created At",
    updatedAt: "Updated At",
  },
  createdAt: "Created At",
  updatedAt: "Updated At",
};
