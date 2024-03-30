import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../../data/accounts.ts";
import type { Activity } from "../../data/activities.ts";
import type { Contact } from "../../data/contacts.ts";
import type { Deal } from "../../data/deals.ts";
import { PageActivities } from "../../islands/activities.tsx";
import { db } from "../../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const [activities, accounts, contacts, deals] = await Promise.all([
    db.find<Activity>("activities"),
    db.find<Account>("accounts"),
    db.find<Contact>("contacts"),
    db.find<Deal>("deals"),
  ]);

  // render entire page as island for simplicity
  return (
    <PageActivities
      activities={activities}
      activity={activities.find((a) => a.id === id) ?? activities[0]}
      accounts={accounts}
      contacts={contacts}
      deals={deals}
    />
  );
});
