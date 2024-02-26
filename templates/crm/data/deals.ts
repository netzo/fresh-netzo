import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";
import { noteSchema } from "./mod.ts";

// schemas:

export const dealSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  name: z.string(),
  notes: z.array(noteSchema),
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
  contactIds: z.array(z.string()),
  userIds: z.array(z.string()),
});

// types:

export type Deal = z.infer<typeof dealSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid() as string,
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  name: faker.lorem.words(),
  notes: Array.from(Array(5)).map(() => ({
    name: faker.lorem.paragraph(),
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
  contactIds: Array.from(Array(2)).map(() => ulid()),
  userIds: Array.from(Array(2)).map(() => ulid()),
});
