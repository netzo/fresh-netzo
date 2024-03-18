import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../../data/accounts.ts";
import type { Deal } from "../../data/deals.ts";
import { PageAccount } from "../../islands/account.tsx";
import { db } from "../../plugins/db.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const [account, allDeals] = await Promise.all([
    db.get<Account>("accounts", id),
    db.find<Deal>("deals"),
  ]);

  const deals = allDeals.filter((deal) => deal.accountId === account?.id);

  // render entire page as island for simplicity
  return <PageAccount {...{ id, account, deals }} />;
});
