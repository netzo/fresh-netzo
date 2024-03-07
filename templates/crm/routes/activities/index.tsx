import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../../data/accounts.ts";
import type { Activity } from "../../data/activities.ts";
import type { Contact } from "../../data/contacts.ts";
import type { Deal } from "../../data/deals.ts";
import { PageActivities } from "../../islands/activities.tsx";
import { $api } from "../../plugins/api.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const [activities, accounts, contacts, deals] = await Promise.all([
    $api.activities.find() as Activity[],
    $api.accounts.find() as Account[],
    $api.contacts.find() as Contact[],
    $api.deals.find() as Deal[],
  ]);

  // render entire page as island for simplicity
  return (
    <PageActivities
      activity={activities.find((a) => a.id === id) ?? activities[0]}
      activities={activities.map((activity) => ({
        ...activity,
        accounts: accounts.filter((a) => activity.accountIds.includes(a.id)),
        contacts: contacts.filter((c) => activity.contactIds.includes(c.id)),
        deals: deals.filter((d) => activity.dealIds.includes(d.id)),
      }))}
      accounts={accounts}
      contacts={contacts}
      deals={deals}
    />
  );
});
