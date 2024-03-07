import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../../data/accounts.ts";
import type { Contact } from "../../data/contacts.ts";
import { PageContacts } from "../../islands/contacts.tsx";
import { $api } from "../../plugins/api.config.ts";

// NOTE: cannot pass functions as props from routes (server) to islands (client)
export default defineRoute(async (req, ctx) => {
  const [contacts, accounts] = await Promise.all([
    $api.contacts.find() as Contact[],
    $api.accounts.find() as Account[],
  ]);

  // render entire page as island for simplicity
  return (
    <PageContacts
      contacts={contacts.map((contact) => ({
        ...contact,
        account: accounts.find((a) => a.id === contact.accountId),
      }))}
    />
  );
});
