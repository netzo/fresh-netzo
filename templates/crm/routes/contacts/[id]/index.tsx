import { defineRoute } from "$fresh/server.ts";
import {
  ContactCardDeals,
  ContactCardForm,
  ContactMetrics,
} from "../../../islands/contact.tsx";
import { ContactState } from "./_layout.tsx";

export default defineRoute<ContactState>((req, ctx) => {
  const { id, contact, deals: allDeals } = ctx.state.data;
  const deals = allDeals.filter((deal) => deal.contactId === contact?.id);

  return (
    <div className="h-full overflow-y-auto">
      <div class="flex flex-col gap-4 p-4">
        <ContactMetrics contact={contact} deals={deals} />
        <div className="grid lg:grid-cols-2 gap-4">
          <ContactCardForm contact={contact} />
          <ContactCardDeals contact={contact} deals={deals} />
        </div>
      </div>
    </div>
  );
});
