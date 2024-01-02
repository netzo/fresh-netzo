import { z } from "netzo/deps/zod/mod.ts";

const addressSchema = z.object({
  streetAddress: z.string(),
  number: z.string(),
  city: z.string(),
  postCode: z.string(),
});

const notificationSchema = z.object({
  payments: z.union([z.boolean(), z.string()]),
  invoices: z.union([z.boolean(), z.string()]),
  promotions: z.union([z.boolean(), z.string()]),
  marketing: z.union([z.boolean(), z.string()]),
});

export const accountSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  status: z.union([z.literal("active"), z.literal("inactive")]),
  type: z.string(),
  web: z.string().url({ message: "Invalid URL" }).optional().or(z.literal("")),
  phone: z.string(),
  address: addressSchema,
  notifications: notificationSchema,
}).deepPartial();

export type Account = z.infer<typeof accountSchema>;
