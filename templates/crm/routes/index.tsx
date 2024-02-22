import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../data/accounts.ts";
import type { Contact } from "../data/contacts.ts";
import type { Deal } from "../data/deals.ts";
import type { Quote } from "../data/quotes.ts";
import type { User } from "../data/users.ts";
import { Dashboard } from "../islands/dashboard/Dashboard.tsx";
import { $client } from "../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const data = await Promise.all([
    $client.accounts.find() as Account[],
    $client.contacts.find() as Contact[],
    $client.deals.find() as Deal[],
    $client.quotes.find() as Quote[],
    $client.users.find() as User[],
  ]);

  return <Dashboard data={data} />;
});
