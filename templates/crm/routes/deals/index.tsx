import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../../data/accounts.ts";
import { type Deal } from "../../data/deals.ts";
import * as Deals from "../../islands/deals.tsx";
import { $client } from "../../netzo.config.ts";

// NOTE: cannot pass functions as props from routes (server) to islands (client)
export default defineRoute(async (req, ctx) => {
  const [deals, accounts] = await Promise.all([
    $client.deals.find() as Deal[],
    $client.accounts.find() as Account[],
  ]);

  const data = deals.map((deal) => ({
    ...deal,
    account: accounts.find((account) => account.id === deal.accountId),
  }));

  return (
    <div className="h-full p-4">
      <Deals.Kanban data={data} />
    </div>
  );
});
