import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../../data/accounts.ts";
import type { Contact } from "../../data/contacts.ts";
import * as ContactsIslands from "../../islands/contacts.tsx";
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
    <div className="flex flex-col space-y-4 py-4 h-screen">
      <ContactsIslands.Main data={data} />
    </div>
  );
});
