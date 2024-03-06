import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../../data/accounts.ts";
import { type Deal } from "../../data/deals.ts";
import * as DealsIslands from "../../islands/deals.tsx";
import { $api } from "../../plugins/api.config.ts";

// NOTE: cannot pass functions as props from routes (server) to islands (client)
export default defineRoute(async (req, ctx) => {
  const [deals, accounts] = await Promise.all([
    $api.deals.find() as Deal[],
    $api.accounts.find() as Account[],
  ]);

  const data = deals.map((deal) => ({
    ...deal,
    account: accounts.find((account) => account.id === deal.accountId),
  }));

  return (
    <div className="flex flex-col h-screen">
      <DealsIslands.Main data={data} />
    </div>
  );
});
