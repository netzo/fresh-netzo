import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/separator.tsx";
import type { Account as TAccount } from "../../data/accounts.ts";
import { Account } from "../../islands/account.tsx";
import { $client } from "../../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const account = await $client.accounts.get(id) as TAccount;
  const allDeals = await $client.deals.find() as Deal[];
  const deals = allDeals.filter((deal) => deal.accountId === account?.id);

  return (
    <div className="overflow-auto">
      <Separator />
      <Account id={id} account={account} deals={deals} />
    </div>
  );
});
