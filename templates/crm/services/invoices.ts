import { z } from "netzo/deps/zod/mod.ts";

// schemas:

export const invoiceSchema = z.object({
  id: z.string(),
  status: z.union([
    z.literal("pending"),
    z.literal("paid"),
    z.literal("cancelled"),
  ]),
  xml: z.string(),
  pdf: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// types:

export type Invoice = z.infer<typeof invoiceSchema>;

// i18n:

export const ALIASES = {
  id: "Invoice Id",
  status: "Status",
  xml: "XML",
  pdf: "PDF",
  createdAt: "Created At",
  updatedAt: "Updated At",
};
