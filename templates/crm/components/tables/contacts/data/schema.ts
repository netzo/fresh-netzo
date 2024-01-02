import { z } from "netzo/deps/zod/mod.ts";
import { accountSchema } from "@/components/tables/accounts/data/schema.ts";

const notificationSchema = z.object({
  new: z.boolean(),
  promotions: z.boolean(),
  marketing: z.boolean(),
}).deepPartial();

export const contactSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  avatar: z.string(),
  email: z.string().email({
    message: "Invalid email format",
  }).optional().or(z.literal("")),
  phone: z.string(),
  notifications: notificationSchema,
  accountId: z.string(),
  account: accountSchema,
}).deepPartial();

export type Contact = z.infer<typeof contactSchema>;
