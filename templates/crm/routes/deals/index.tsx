import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../../data/accounts.ts";
import { type Deal } from "../../data/deals.ts";
import { PageDeals } from "../../islands/deals.tsx";
import { db } from "../../plugins/db.config.ts";

// NOTE: cannot pass functions as props from routes (server) to islands (client)
export default defineRoute(async (req, ctx) => {
  const [deals, accounts] = await Promise.all([
    db.find<Deal>("deals"),
    db.find<Account>("accounts"),
  ]);

  // render entire page as island for simplicity
  return (
    <PageDeals
      deals={deals.map((deal) => ({
        ...deal,
        account: accounts.find((a) => a.id === deal.accountId),
      }))}
    />
  );
});
