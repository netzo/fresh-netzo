import { authenticate, log } from "netzo/plugins/api/hooks/mod.ts";
import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { CustomResource } from "netzo/plugins/api/resources/mod.ts";
import type { Deal } from "../../data/deals.ts";
import { $client } from "../../netzo.config.ts";

export const metrics = defineApiEndpoint({
  name: "metrics",
  idField: "id",
  resource: CustomResource({
    find: async ({ accountId }) => {
      const allDeals = await $client.deals.find() as Deal[];
      const deals = accountId
        ? allDeals.filter((deal) => deal.accountId === accountId)
        : allDeals;
      return {
        totalAmount: allDeals.reduce(
          (acc, deal) => acc + Number(deal.amount),
          0,
        ),
        totalAmountOfAccount: deals.reduce(
          (acc, deal) => acc + Number(deal.amount),
          0,
        ),
        totalDeals: allDeals.length,
        totalDealsOfAccount: deals.length,
        allDeals,
        deals,
        dealsPerMonth: Array.from({ length: 12 }, (_, month) => ({
          month,
          total: Math.floor(Math.random() * 5000) + 1000,
        })),
      };
    },
  }),
  hooks: {
    all: [authenticate(), log()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});
