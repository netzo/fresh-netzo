import { z } from "zod";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { ulid } from "netzo/core/api/utils.ts";

// schemas:

export const invoiceSchema = z.object({
  id: z.string(),
  status: z.enum([
    "pending",
    "paid",
    "cancelled",
  ]),
  xml: z.string(),
  pdf: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// types:

export type Invoice = z.infer<typeof invoiceSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid(),
  status: faker.helpers.arrayElement(["pending", "paid", "cancelled"]),
  xml: faker.lorem.paragraph(),
  pdf: faker.internet.url(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
});

// i18n:

export const I18N = {
  id: "Invoice ID",
  status: "Status",
  xml: "XML",
  pdf: "PDF",
  createdAt: "Created At",
  updatedAt: "Updated At",
};
