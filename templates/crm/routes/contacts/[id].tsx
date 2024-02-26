import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/separator.tsx";
import type { Contact as TContact } from "../../data/contacts.ts";
import type { Deal } from "../../data/deals.ts";
import { Contact } from "../../islands/contact.tsx";
import { $client } from "../../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const contact = await $client.contacts.get(id) as TContact;
  const allDeals = await $client.deals.find() as Deal[];
  const deals = allDeals.filter((deal) =>
    deal.contactIds.includes(contact?.id)
  );

  return (
    <div>
      <Separator />
      <Contact id={id} contact={contact} deals={deals} />
    </div>
  );
});
