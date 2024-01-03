import { z } from "netzo/deps/zod/mod.ts";
import { accountSchema } from "@/data/accounts.schema.ts";

export const invoiceSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  invoiceNumber: z.string(),
  description: z.string(),
  dueDate: z.string(),
  status: z.union([
    z.literal("pending"),
    z.literal("paid"),
    z.literal("cancelled"),
  ]),
  subtotal: z.string(),
  tax: z.string(),
  total: z.string(),
  accountId: z.string(),
  account: accountSchema,
});

export type Invoice = z.infer<typeof invoiceSchema>;
