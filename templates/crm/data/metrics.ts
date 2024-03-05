import { z } from "zod";
import { dealSchema } from "./deals.ts";

// schemas:

export const metricSchema = z.object({
  count: z.object({
    all: z.coerce.number(),
    ofAccount: z.coerce.number(),
    perStatus: z.object({
      lead: z.coerce.number(),
      qualified: z.coerce.number(),
      negotiation: z.coerce.number(),
      won: z.coerce.number(),
      lost: z.coerce.number(),
    }),
    perMonth: z.array(z.object({
      month: z.coerce.number(),
      amount: z.coerce.number(),
    })),
  }),
  amount: z.object({
    all: z.coerce.number(),
    ofAccount: z.coerce.number(),
    perStatus: z.object({
      lead: z.coerce.number(),
      qualified: z.coerce.number(),
      negotiation: z.coerce.number(),
      won: z.coerce.number(),
      lost: z.coerce.number(),
    }),
    perMonth: z.array(z.object({
      month: z.coerce.number(),
      amount: z.coerce.number(),
    })),
  }),
  totalAmount: z.coerce.number(),
  totalAmountOfAccount: z.coerce.number(),
  totalAmountPerMonth: z.coerce.number(),
  totalDeals: z.coerce.number(),
  totalDealsOfAccount: z.coerce.number(),
  totalDealsPerMonth: z.coerce.number(),
  deals: z.array(dealSchema),
  dealsPerMonth: z.array(z.object({
    month: z.coerce.number(),
    amount: z.coerce.number(),
  })),
  dealsAmountThroughTime: z.array(z.object({
    createdAt: z.string().datetime().default(() => new Date().toISOString()),
    amount: z.coerce.number(),
  })),
});

// types:

export type Metric = z.infer<typeof metricSchema>;
