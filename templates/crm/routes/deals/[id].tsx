import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../../data/accounts.ts";
import type { Contact } from "../../data/contacts.ts";
import type { Deal } from "../../data/deals.ts";
import { PageDeal } from "../../islands/deal.tsx";
import { db } from "../../plugins/db.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const [deal, deals, accounts, contacts] = await Promise.all([
    db.get<Deal>("deals", id),
    db.find<Deal>("deals"),
    db.find<Account>("accounts"),
    db.find<Contact>("contacts"),
  ]);

  // render entire page as island for simplicity
  return <PageDeal {...{ id, deal, deals, accounts, contacts }} />;
});
