import { ulid } from "netzo/plugins/database/database.ts";
import { z } from "zod";

// schemas:

export const dealSchema = z.object({
  id: z.string().ulid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  name: z.string(),
  description: z.string(),
  status: z.enum([
    "lead",
    "qualified",
    "negotiation",
    "won",
    "lost",
  ]),
  amount: z.coerce.number(),
  currencyCode: z.enum(["USD"]),
  accountId: z.string(),
  contactIds: z.array(z.string()),
});

// types:

export type Deal = z.infer<typeof dealSchema>;

// defaults:

export const getDeal = (data?: Partial<Deal>) => ({
  id: ulid(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  name: "",
  description: "",
  status: "lead",
  amount: 0,
  currencyCode: "USD",
  accountId: "",
  contactIds: [],
  ...data,
});
