import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../../data/accounts.ts";
import { type Deal } from "../../data/deals.ts";
import { PageDeals } from "../../islands/deals.tsx";
import { $api } from "../../plugins/api.config.ts";

// NOTE: cannot pass functions as props from routes (server) to islands (client)
export default defineRoute(async (req, ctx) => {
  const [deals, accounts] = await Promise.all([
    $api.deals.find() as Deal[],
    $api.accounts.find() as Account[],
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
