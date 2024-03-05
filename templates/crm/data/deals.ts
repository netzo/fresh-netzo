import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";

// schemas:

export const dealSchema = z.object({
  id: z.string().ulid().default(() => ulid()),
  createdAt: z.string().datetime().default(() => new Date().toISOString()),
  updatedAt: z.string().datetime().default(() => new Date().toISOString()),
  name: z.string().default(""),
  description: z.string().default(""),
  status: z.enum([
    "lead",
    "qualified",
    "negotiation",
    "won",
    "lost",
  ]).default("lead"),
  amount: z.coerce.number().default(0),
  currencyCode: z.enum(["USD"]).default("USD"),
  accountId: z.string().default(""),
  contactIds: z.array(z.string()).default([]),
  userIds: z.array(z.string()).default([]),
});

// types:

export type Deal = z.infer<typeof dealSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid() as string,
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  name: faker.lorem.words(),
  description: faker.lorem.sentences(),
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
  contactIds: Array.from(Array(2)).map(() => ulid()),
  userIds: Array.from(Array(2)).map(() => ulid()),
});
