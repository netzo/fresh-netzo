import { defineRoute } from "$fresh/server.ts";
import type { NetzoState } from "netzo/mod.ts";
import type { Account } from "../../data/accounts.ts";
import type { Activity } from "../../data/activities.ts";
import type { Contact } from "../../data/contacts.ts";
import type { Deal } from "../../data/deals.ts";
import * as ActivitiesIslands from "../../islands/activities.tsx";
import { $api } from "../../plugins/api.config.ts";

type ActivitiesState = NetzoState & {
  activity: Activity;
  accounts: Account[];
  contacts: Contact[];
  deals: Deal[];
  activities: Activity[];
};

export default defineRoute<ActivitiesState>(async (req, ctx) => {
  const { id } = ctx.params;
  const [accounts, contacts, deals, activities] = await Promise.all([
    $api.accounts.find() as Account[],
    $api.contacts.find() as Contact[],
    $api.deals.find() as Deal[],
    $api.activities.find() as Activity[],
  ]);

  const data = {
    activity: activities.find((activity) => activity.id === id) ??
      activities[0],
    activities: activities.map((activity) => ({
      ...activity,
      accounts: accounts.filter((account) =>
        activity.accountIds.includes(account.id)
      ),
      contacts: contacts.filter((contact) =>
        activity.contactIds.includes(contact.id)
      ),
      deals: deals.filter((deal) => activity.dealIds.includes(deal.id)),
    })),
    accounts,
    contacts,
    deals,
  };

  ctx.state.data = data;

  return (
    <div className="flex flex-col h-screen">
      <ActivitiesIslands.Main data={data} />
    </div>
  );
});
