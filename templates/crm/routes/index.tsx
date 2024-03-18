import { Partial } from "$fresh/runtime.ts";
import { defineRoute } from "$fresh/server.ts";
import { Button } from "netzo/components/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "netzo/components/card.tsx";
import type { Account } from "../data/accounts.ts";
import type { Deal } from "../data/deals.ts";
import * as Dashboard from "../islands/dashboard.tsx";
import { db } from "../plugins/db.config.ts";

export default defineRoute(async (req, ctx) => {
  const accountId = ctx.url.searchParams.get("accountId");
  const [metrics, accounts, deals] = await Promise.all([
    getMetrics({ accountId }),
    db.find<Account>("accounts"),
    db.find<Deal>("deals"),
  ]);

  const account = accounts.find(({ id }) => id === accountId) as Account;

  return (
    <div className="h-100vh overflow-y-auto p-4">
      <div className="p-4 space-y-4">
        <div f-client-nav className="flex items-center">
          <Dashboard.AccountSelect accounts={accounts} account={account} />
          {/* <MainNav className="mx-6" /> */}
          <div className="ml-auto flex items-center space-x-4">
            <Button onClick={() => globalThis.print()}>
              <i className="mdi-printer w-4 h-4 mr-2" />
              Print PDF
            </Button>
          </div>
        </div>

        <Partial name="main-content">
          <Dashboard.Cards data={metrics} account={account} />

          <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-4">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Deals per month</CardTitle>
              </CardHeader>
              <CardContent>
                <Dashboard.ChartDealsPerMonth data={metrics} />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Deals per status</CardTitle>
              </CardHeader>
              <CardContent>
                <Dashboard.ChartDealsPerStatus data={metrics} />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Deals total through time</CardTitle>
              </CardHeader>
              <CardContent>
                <Dashboard.ChartDealsThroughTime data={metrics} />
              </CardContent>
            </Card>
          </div>
        </Partial>
      </div>
    </div>
  );
});

// metrics:

export type Metrics = {
  count: {
    all: number;
    ofAccount: number;
    perStatus: {
      lead: number;
      qualified: number;
      negotiation: number;
      won: number;
      lost: number;
    };
    perMonth: { month: number; amount: number }[];
  };
  amount: {
    all: number;
    ofAccount: number;
    perStatus: {
      lead: number;
      qualified: number;
      negotiation: number;
      won: number;
      lost: number;
    };
    perMonth: { month: number; amount: number }[];
  };
  deals: Deal[];
  dealsPerMonth: { month: number; amount: number }[];
  dealsAmountThroughTime: { createdAt: string; amount: number }[];
};

async function getMetrics(query: { accountId?: string }): Promise<Metrics> {
  const allDealsUnsorted = await db.find<Deal>("deals");
  const allDeals = allDealsUnsorted.sort((a, b) => a.createdAt - b.createdAt);
  const deals = query?.accountId
    ? allDeals.filter((deal) => deal.accountId === query.accountId)
    : allDeals;

  return {
    count: {
      all: allDeals.length,
      ofAccount: deals.length,
      perStatus: {
        lead: deals.filter((deal) => deal.status === "lead").length,
        qualified: deals.filter((deal) => deal.status === "qualified").length,
        negotiation:
          deals.filter((deal) => deal.status === "negotiation").length,
        won: deals.filter((deal) => deal.status === "won").length,
        lost: deals.filter((deal) => deal.status === "lost").length,
      },
      perMonth: deals.reduce(
        (acc, deal) => {
          const date = new Date(deal["createdAt"]);
          const month = date.getMonth();
          acc[month].amount = acc[month]?.amount + Number(deal.amount);
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
}

function getTotalAmountThroughTime(deals: Deal[], isoDate: string) {
  return deals
    .filter((deal) =>
      new Date(deal.createdAt).getTime() <= new Date(isoDate).getTime()
    )
    .reduce((acc, deal) => acc + Number(deal.amount), 0);
}
