import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";

// schemas:

export const dealSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  name: z.string(),
  tags: z.array(z.string()),
  notes: z.array(z.object({
    name: z.string(),
    tags: z.array(z.string()),
    content: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })),
  status: z.enum([
    "lead",
    "qualified",
    "negotiation",
    "won",
    "lost",
  ]),
  amount: z.number(),
  currencyCode: z.enum(["USD"]),
  accountId: z.string(),
  userIds: z.array(z.string()),
  contactIds: z.array(z.string()),
});

// types:

export type Deal = z.infer<typeof dealSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid() as string,
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  name: faker.lorem.words(),
  tags: Array.from(Array(3)).map(() => faker.lorem.word()),
  notes: Array.from(Array(5)).map(() => ({
    name: faker.lorem.paragraph(),
    tags: Array.from(Array(2)).map(() => faker.lorem.word()),
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  })),
  status: faker.helpers.arrayElement([
    "lead",
    "qualified",
    "negotiation",
    "won",
    "lost",
  ]),
  amount: faker.commerce.price({ min: 99, max: 99_999 }),
  currencyCode: "USD",
  accountId: ulid(),
  userIds: Array.from(Array(2)).map(() => ulid()),
  contactIds: Array.from(Array(2)).map(() => ulid()),
});
