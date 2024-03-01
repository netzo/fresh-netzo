import { z } from "zod";
import { dealSchema } from "./deals.ts";

// schemas:

export const metricSchema = z.object({
  count: z.object({
    all: z.number(),
    ofAccount: z.number(),
    perStatus: z.object({
      lead: z.number(),
      qualified: z.number(),
      negotiation: z.number(),
      won: z.number(),
      lost: z.number(),
    }),
    perMonth: z.array(z.object({
      month: z.number(),
      amount: z.number(),
    })),
  }),
  amount: z.object({
    all: z.number(),
    ofAccount: z.number(),
    perStatus: z.object({
      lead: z.number(),
      qualified: z.number(),
      negotiation: z.number(),
      won: z.number(),
      lost: z.number(),
    }),
    perMonth: z.array(z.object({
      month: z.number(),
      amount: z.number(),
    })),
  }),
  totalAmount: z.number(),
  totalAmountOfAccount: z.number(),
  totalAmountPerMonth: z.number(),
  totalDeals: z.number(),
  totalDealsOfAccount: z.number(),
  totalDealsPerMonth: z.number(),
  deals: z.array(dealSchema),
  dealsPerMonth: z.array(z.object({
    month: z.number(),
    amount: z.number(),
  })),
  dealsAmountThroughTime: z.array(z.object({
    createdAt: z.string().datetime(),
    amount: z.number(),
  })),
});

// types:

export type Metric = z.infer<typeof metricSchema>;
