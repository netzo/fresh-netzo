import { defineRoute } from "$fresh/server.ts";
import type { Contact } from "../../data/contacts.ts";
import type { Deal } from "../../data/deals.ts";
import { PageContact } from "../../islands/contact.tsx";
import { $api } from "../../plugins/api.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const [contact, allDeals] = await Promise.all([
    $api.contacts.get(id) as Contact,
    $api.deals.find() as Deal[],
  ]);

  const deals = allDeals.filter((deal) =>
    deal.contactIds.includes(contact?.id)
  );

  // render entire page as island for simplicity
  return <PageContact {...{ id, contact, deals }} />;
});
