import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";

// schemas:

export const quoteSchema = z.object({
  id: z.string(),
  status: z.enum([
    "pending",
    "paid",
    "lost",
  ]),
  xml: z.string(),
  pdf: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// types:

export type Quote = z.infer<typeof quoteSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid(),
  status: faker.helpers.arrayElement(["pending", "paid", "lost"]),
  xml: faker.lorem.paragraph(),
  pdf: faker.internet.url(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
});

// i18n:

export const I18N = {
  id: "Quote ID",
  status: "Status",
  xml: "XML",
  pdf: "PDF",
  createdAt: "Created At",
  updatedAt: "Updated At",
};
