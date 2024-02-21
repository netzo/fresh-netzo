import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";

// schemas:

export const dealSchema = z.object({
  id: z.string(),
  status: z.enum([
    "lead",
    "qualified",
    "negotiation",
    "won",
    "lost",
  ]),
  accountIds: z.array(z.string()),
  accounts: z.array(z.any()), // accountSchema causes circular dependency
  contactIds: z.array(z.string()),
  contacts: z.array(z.any()), // contactSchema causes circular dependency
  title: z.string(),
  description: z.string(),
  amount: z.number(),
  currency: z.string(),
  notes: z.array(z.object({
    text: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })),
  tasks: z.array(z.object({
    type: z.string(),
    status: z.enum([
      "backlog",
      "todo",
      "in-progress",
      "done",
      "cancelled",
    ]),
    title: z.string(),
    description: z.string(),
    dateDue: z.string(),
    dateCompleted: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// types:

export type Deal = z.infer<typeof dealSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid(),
  status: faker.helpers.arrayElement([
    "lead",
    "qualified",
    "negotiation",
    "won",
    "lost",
  ]),
  accountIds: Array.from(Array(2)).map(() => ulid()),
  accounts: Array.from(Array(2)).map(() => ({})),
  contactIds: Array.from(Array(2)).map(() => ulid()),
  contacts: Array.from(Array(2)).map(() => ({})),
  title: faker.lorem.words(),
  description: faker.lorem.sentence(),
  amount: faker.number.int(),
  currency: faker.finance.currencyCode(),
  notes: Array.from(Array(3)).map(() => ({
    text: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  })),
  tasks: Array.from(Array(2)).map(() => ({
    type: faker.lorem.word(),
    status: "in-progress",
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    dateDue: faker.date.future().toISOString(),
    dateCompleted: faker.date.recent().toISOString(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  })),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
});

// i18n:

export const I18N = {
  id: "Deal ID",
  status: {
    lead: "Lead",
    qualified: "Qualified",
    negotiation: "In Progress",
    won: "Won",
    lost: "Lost",
  },
  accountIds: "Accounts Ids",
  accounts: "Accounts",
  contactIds: "Contact Ids",
  contacts: "Contacts",
  title: "Title",
  description: "Description",
  amount: "Amount",
  currency: "Currency",
  notes: {
    text: "Text",
    createdAt: "Created at",
    updatedAt: "Updated at",
  },
  tasks: {
    type: "Type",
    status: "Status",
    title: "Title",
    description: "Description",
    dateDue: "Date due",
    dateCompleted: "Date completed",
    createdAt: "Created at",
    updatedAt: "Updated at",
  },
  createdAt: "Created at",
  updatedAt: "Updated at",
};
