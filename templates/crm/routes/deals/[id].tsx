import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../../data/accounts.ts";
import type { Contact } from "../../data/contacts.ts";
import type { Deal } from "../../data/deals.ts";
import { PageDeal } from "../../islands/deal.tsx";
import { $api } from "../../plugins/api.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const [deal, deals, accounts, contacts] = await Promise.all([
    $api.deals.get(id) as Deal,
    $api.deals.find() as Deal[],
    $api.accounts.find() as Account[],
    $api.contacts.find() as Contact[],
  ]);

  // render entire page as island for simplicity
  return <PageDeal {...{ id, deal, deals, accounts, contacts }} />;
});
