import { z } from "zod/mod.ts";
import { clientSchema } from "@/components/tables/clients/data/schema.ts";

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
  firstName: z.string(),
  lastName: z.string(),
  avatar: z.string(),
  email: z.string().email({
    message: "Invalid email format",
  }).optional().or(z.literal("")),
  phone: z.string(),
  notifications: notificationSchema,
  clientId: z.string(),
  client: clientSchema,
}).deepPartial();

export type Contact = z.infer<typeof contactSchema>;
