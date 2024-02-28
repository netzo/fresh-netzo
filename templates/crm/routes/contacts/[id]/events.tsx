import { defineRoute } from "$fresh/server.ts";
import type { NetzoState } from "netzo/mod.ts";
import type { Account } from "../../../data/accounts.ts";
import type { Contact } from "../../../data/contacts.ts";
import type { Deal } from "../../../data/deals.ts";
import type { Event } from "../../../data/events.ts";
import type { User } from "../../../data/users.ts";
import * as EventsIslands from "../../../islands/events.tsx";
import { $client } from "../../../netzo.config.ts";

type EventsState = NetzoState & {
  events: Event[];
};

export default defineRoute<EventsState>(async (req, ctx) => {
  // const { id, contact, deals: allDeals } = ctx.state.data;
  const [accounts, contacts, deals, events, users] = await Promise.all([
    $client.accounts.find() as Account[],
    $client.contacts.find() as Contact[],
    $client.deals.find() as Deal[],
    $client.events.find() as Event[],
    $client.users.find() as User[],
  ]);

  const data = events.map((event) => ({
    ...event,
    accounts: accounts.filter((account) =>
      event.accountIds.includes(account.id)
    ),
    contact: contacts.find((contact) => event.contactIds.includes(contact.id)),
    deals: deals.filter((deal) => event.dealIds.includes(deal.id)),
    users: users.filter((user) => event.userIds.includes(user.id)),
  }));

  ctx.state.data = { events: data };

  return (
    <div className="h-screen overflow-y-auto">
      <EventsIslands.Panels data={data} />
    </div>
  );
});
