import { authenticate, log } from "netzo/plugins/api/hooks/mod.ts";
import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { CustomResource } from "netzo/plugins/api/resources/mod.ts";
import type { Deal } from "../../data/deals.ts";
import { $client } from "../../netzo.config.ts";

export const metrics = defineApiEndpoint({
  name: "metrics",
  idField: "id",
  resource: CustomResource({
    find: async (query: { accountId?: string }) => {
      const allDealsUnsorted = await $client.deals.find() as Deal[];
      const allDeals = allDealsUnsorted.sort((a, b) =>
        a.createdAt - b.createdAt
      );
      const deals = query?.accountId
        ? allDeals.filter((deal) => deal.accountId === query.accountId)
        : allDeals;
      return {
        count: {
          all: allDeals.length,
          ofAccount: deals.length,
          perStatus: {
            lead: deals.filter((deal) => deal.status === "lead").length,
            qualified: deals.filter((deal) =>
              deal.status === "qualified"
            ).length,
            negotiation: deals.filter((deal) =>
              deal.status === "negotiation"
            ).length,
            won: deals.filter((deal) => deal.status === "won").length,
            lost: deals.filter((deal) => deal.status === "lost").length,
          },
          perMonth: deals.reduce(
            (acc, deal) => {
              const date = new Date(deal["createdAt"]);
              const month = date.getMonth();
              acc[month].amount = acc[month].amount + Number(deal.amount);
              return acc;
            },
            Array.from({ length: 12 }).map((_, i) => ({ month: i, amount: 0 })),
          ),
        },
        amount: {
          all: allDeals.reduce((acc, deal) => acc + Number(deal.amount), 0),
          ofAccount: deals.reduce(
            (acc, deal) => acc + Number(deal.amount),
            0,
          ),
          perStatus: {
            lead: deals.filter((deal) => deal.status === "lead").reduce(
              (acc, deal) => acc + Number(deal.amount),
              0,
            ),
            qualified: deals.filter((deal) => deal.status === "qualified")
              .reduce((acc, deal) => acc + Number(deal.amount), 0),
            negotiation: deals.filter((deal) => deal.status === "negotiation")
              .reduce((acc, deal) => acc + Number(deal.amount), 0),
            won: deals.filter((deal) => deal.status === "won").reduce(
              (acc, deal) => acc + Number(deal.amount),
              0,
            ),
            lost: deals.filter((deal) => deal.status === "lost").reduce(
              (acc, deal) => acc + Number(deal.amount),
              0,
            ),
          },
          perMonth: deals.reduce(
            (acc, deal) => {
              const date = new Date(deal["createdAt"]);
              const month = date.getMonth();
              acc[month].amount = acc[month].amount + Number(deal.amount);
              return acc;
            },
            Array.from({ length: 12 }).map((_, i) => ({ month: i, amount: 0 })),
          ),
        },
        deals,
        dealsPerMonth: deals.reduce((acc, deal) => {
          const date = new Date(deal["createdAt"]);
          const month = date.getMonth();
          acc[month].amount = acc[month].amount + Number(deal.amount);
          return acc;
        }, Array.from({ length: 12 }).map((_, i) => ({ month: i, amount: 0 }))),
        dealsAmountThroughTime: deals
          .sort((a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .map((deal) => ({
            createdAt: deal["createdAt"],
            amount: getTotalAmountThroughTime(deals, deal.createdAt),
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

function getTotalAmountThroughTime(deals: Deal[], isoDate: string) {
  return deals
    .filter((deal) =>
      new Date(deal.createdAt).getTime() <= new Date(isoDate).getTime()
    )
    .reduce((acc, deal) => acc + Number(deal.amount), 0);
}
