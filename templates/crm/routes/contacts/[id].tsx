import { defineRoute } from "$fresh/server.ts";
import type { Contact } from "../../data/contacts.ts";
import type { Deal } from "../../data/deals.ts";
import { PageContact } from "../../islands/contact.tsx";
import { db } from "../../plugins/database.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const [contact, accounts, allDeals] = await Promise.all([
    db.get<Contact>("contacts", id),
    db.find<Account>("accounts"),
    db.find<Deal>("deals"),
  ]);

  const deals = allDeals.filter((deal) =>
    deal.contactIds.includes(contact?.id)
  );

  // render entire page as island for simplicity
  return <PageContact {...{ id, contact, accounts, deals }} />;
});
