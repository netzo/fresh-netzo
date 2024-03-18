import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../../data/accounts.ts";
import type { Contact } from "../../data/contacts.ts";
import { PageContacts } from "../../islands/contacts.tsx";
import { db } from "../../plugins/db.config.ts";

// NOTE: cannot pass functions as props from routes (server) to islands (client)
export default defineRoute(async (req, ctx) => {
  const [contacts, accounts] = await Promise.all([
    db.find<Contact>("contacts"),
    db.find<Account>("accounts"),
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
