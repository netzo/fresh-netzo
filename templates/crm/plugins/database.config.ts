import { createDatabase } from "netzo/plugins/database/database.ts";
import { defineDatabaseConfig } from "netzo/plugins/database/plugin.ts";
import type { Account } from "../data/account.ts";
import type { Activity } from "../data/activities.ts";
import { Contact } from "../data/contacts.ts";
import type { Deal } from "../data/deals.ts";

export const kv = await Deno.openKv();

export const db = createDatabase(kv);

export default defineDatabaseConfig({
  kv,
  apiKey: Deno.env.get("NETZO_API_KEY"),
  path: "/db",
  collections: [
    {
      name: "accounts",
      idField: "id",
    },
    {
      name: "activities",
      idField: "id",
      resolver: async (data: Activity) => {
        const [accounts, contacts, deals] = await Promise.all([
          data.accountIds.map((id) => db.get<Account>("accounts", id)),
          data.contactIds.map((id) => db.get<Contact>("contacts", id)),
          data.dealIds.map((id) => db.get<Deal>("deals", id)),
        ]);
        return { ...data, accounts, contacts, deals };
      },
    },
    {
      name: "contacts",
      idField: "id",
      resolver: async (data: Contact) => {
        const account = await db.get<Account>("accounts", data.accountId);
        return { ...data, account };
      },
    },
    {
      name: "deals",
      idField: "id",
      resolver: async (data: Activity) => {
        const [accounts, contacts] = await Promise.all([
          data.accountIds.map((id) => db.get<Account>("accounts", id)),
          data.contactIds.map((id) => db.get<Contact>("contacts", id)),
        ]);
        return { ...data, accounts, contacts };
      },
    },
  ],
});
