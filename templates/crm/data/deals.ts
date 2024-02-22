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
  userId: z.string(),
  accountIds: z.array(z.string()),
  contactIds: z.array(z.string()),
  name: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  amount: z.number(),
  currencyCode: z.enum(["USD"]),
  notes: z.array(z.object({
    text: z.string(),
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
  userId: ulid(),
  accountIds: Array.from(Array(2)).map(() => ulid()),
  contactIds: Array.from(Array(2)).map(() => ulid()),
  name: faker.lorem.words(),
  description: faker.lorem.sentence(),
  tags: Array.from(Array(3)).map(() => faker.lorem.word()),
  amount: faker.commerce.price({ min: 99, max: 99_999 }),
  currencyCode: "USD",
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
  id: "Deal ID",
  status: {
    lead: "Lead",
    qualified: "Qualified",
    negotiation: "In Progress",
    won: "Won",
    lost: "Lost",
  },
  userId: "User ID",
  accountIds: "Accounts Ids",
  contactIds: "Contact Ids",
  name: "Name",
  description: "Description",
  tags: "Tags",
  amount: "Amount",
  currencyCode: "Currency",
  notes: {
    text: "Text",
    createdAt: "Created at",
    updatedAt: "Updated at",
  },
  createdAt: "Created at",
  updatedAt: "Updated at",
};
