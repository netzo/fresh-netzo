import {
  authenticate,
  log,
  resolve,
  validate,
} from "netzo/plugins/api/hooks/mod.ts";
import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/mod.ts";
import type { Account } from "../../data/accounts.ts";
import type { Contact } from "../../data/contacts.ts";
import type { Event } from "../../data/events.ts";
import { eventSchema } from "../../data/events.ts";
import type { User } from "../../data/users.ts";
import { $client } from "../../netzo.config.ts";

export const events = defineApiEndpoint({
  name: "events",
  idField: "id",
  resource: DenoKvResource({ prefix: ["events"] }),
  hooks: {
    all: [authenticate(), log(), validate(eventSchema)],
    find: [],
    get: [
      resolve({
        after: {
          accounts: (data: Event) =>
            Promise.all<Account>(
              data.accountIds?.map((id) => $client.accounts.get(id)),
            ),
          contacts: (data: Event) =>
            Promise.all<Contact>(
              data.contactIds?.map((id) => $client.contacts.get(id)),
            ),
          deals: (data: Event) =>
            Promise.all(data.dealIds?.map((id) => $client.deals.get(id))),
          users: (data: Event) =>
            Promise.all<User>(data.userIds?.map((id) => $client.users.get(id))),
        },
      }),
    ],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});
