import { defineRoute } from "$fresh/server.ts";
import type { NetzoState } from "netzo/mod.ts";
import type { Account } from "../../data/accounts.ts";
import type { Contact } from "../../data/contacts.ts";
import type { Deal } from "../../data/deals.ts";
import type { Event } from "../../data/events.ts";
import type { User } from "../../data/users.ts";
import * as EventsIslands from "../../islands/events.tsx";
import { $client } from "../../netzo.config.ts";

type EventsState = NetzoState & {
  events: Event[];
};

export default defineRoute<EventsState>(async (req, ctx) => {
  const [accounts, contacts, deals, events, users] = await Promise.all([
    $client.accounts.find() as Account[],
    $client.contacts.find() as Contact[],
    $client.deals.find() as Deal[],
    $client.events.find() as Event[],
    $client.users.find() as User[],
  ]);

  const data = {
    event: events.find((event) => event.id === ctx.params.id) ?? events[0],
    events: events.map((event) => ({
      ...event,
      accounts: accounts.filter((account) =>
        event.accountIds.includes(account.id)
      ),
      contacts: contacts.filter((contact) =>
        event.contactIds.includes(contact.id)
      ),
      deals: deals.filter((deal) => event.dealIds.includes(deal.id)),
      users: users.filter((user) => event.userIds.includes(user.id)),
    })),
    accounts,
    contacts,
    deals,
    users,
  };

  ctx.state.data = data;

  return (
    <div className="h-screen overflow-y-auto">
      <EventsIslands.Main data={data} />
    </div>
  );
});
