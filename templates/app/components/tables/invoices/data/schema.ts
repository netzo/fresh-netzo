import { z } from "zod/mod.ts";
import { clientSchema } from "@/components/tables/clients/data/schema.ts";

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
  clientId: z.string(),
  client: clientSchema,
}).deepPartial();

export type Invoice = z.infer<typeof invoiceSchema>;
