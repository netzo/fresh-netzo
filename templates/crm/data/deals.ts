import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";

// schemas:

export const dealSchema = z.object({
  id: z.string().ulid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  name: z.string(),
  description: z.string(),
  status: z.enum([
    "lead",
    "qualified",
    "negotiation",
    "won",
    "lost",
  ]),
  amount: z.coerce.number(),
  currencyCode: z.enum(["USD"]),
  accountId: z.string(),
  contactIds: z.array(z.string()),
});

// types:

export type Deal = z.infer<typeof dealSchema>;

// defaults:

export const getDeal = (data?: Partial<Deal>) => ({
  id: ulid(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  name: "",
  description: "",
  status: "lead",
  amount: 0,
  currencyCode: "USD",
  accountId: "",
  contactIds: [],
  ...data,
});

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
});
