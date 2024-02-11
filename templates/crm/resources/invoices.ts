import { z } from "zod";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { ulid } from "netzo/plugins/api/utils.ts";
import { defineAPIEndpoint } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/denokv.ts";
import { logRuntime } from "netzo/plugins/api/hooks/mod.ts";
import { kv } from "./mod.ts";

export const invoices = defineAPIEndpoint({
  idField: "id",
  resource: DenoKvResource({ kv, prefix: ["invoices"] }),
  hooks: {
    all: [logRuntime],
    find: [logRuntime],
    get: [logRuntime],
    create: [logRuntime],
    update: [logRuntime],
    patch: [logRuntime],
    remove: [logRuntime],
  },
});

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
