import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../../data/accounts.ts";
import type { Contact } from "../../data/contacts.ts";
import * as Contacts from "../../islands/contacts.tsx";
import { $client } from "../../netzo.config.ts";

// NOTE: cannot pass functions as props from routes (server) to islands (client)
export default defineRoute(async (req, ctx) => {
  const [contacts, accounts] = await Promise.all([
    $client.contacts.find() as Contact[],
    $client.accounts.find() as Account[],
  ]);

  const data = contacts.map((contact) => ({
    ...contact,
    account: accounts.find((account) => account.id === contact.accountId),
  }));

  return (
    <div className="h-screen overflow-y-auto p-4">
      <Contacts.Table data={data} />
    </div>
  );
});
