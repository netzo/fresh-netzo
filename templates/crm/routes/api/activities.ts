import { authenticate, log, resolve } from "netzo/plugins/api/hooks/mod.ts";
import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/mod.ts";
import type { Account } from "../../data/accounts.ts";
import type { Activity } from "../../data/activities.ts";
import type { Contact } from "../../data/contacts.ts";
import { $client } from "../../netzo.config.ts";

export const activities = defineApiEndpoint({
  name: "activities",
  idField: "id",
  resource: DenoKvResource({ prefix: ["activities"] }),
  hooks: {
    all: [authenticate(), log()],
    find: [],
    get: [
      resolve({
        after: {
          accounts: (data: Activity) =>
            Promise.all<Account>(
              data.accountIds?.map((id) => $client.accounts.get(id)),
            ),
          contacts: (data: Activity) =>
            Promise.all<Contact>(
              data.contactIds?.map((id) => $client.contacts.get(id)),
            ),
          deals: (data: Activity) =>
            Promise.all(data.dealIds?.map((id) => $client.deals.get(id))),
        },
      }),
    ],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});
