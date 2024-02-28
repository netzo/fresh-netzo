import { z } from "zod";
import { dealSchema } from "./deals.ts";

// schemas:

export const metricSchema = z.object({
  totalAmount: z.number(),
  totalAmountOfAccount: z.number(),
  totalDeals: z.number(),
  totalDealsOfAccount: z.number(),
  allDeals: z.array(dealSchema),
  deals: z.array(dealSchema),
  dealsPerMonth: z.array(z.object({
    month: z.number(),
    total: z.number(),
  })),
});

// types:

export type Metric = z.infer<typeof metricSchema>;
