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
import type { Deal } from "../../data/deals.ts";
import { dealSchema } from "../../data/deals.ts";
import type { User } from "../../data/users.ts";
import { $client } from "../../netzo.config.ts";

export const deals = defineApiEndpoint({
  name: "deals",
  idField: "id",
  resource: DenoKvResource({ prefix: ["deals"] }),
  hooks: {
    all: [authenticate(), log(), validate(dealSchema)],
    find: [],
    get: [
      resolve({
        after: {
          account: (data: Deal) =>
            $client.accounts.get(data.accountId) as Account,
          contacts: (data: Deal) =>
            Promise.all<Contact>(
              data.contactIds?.map((id) => $client.contacts.get(id)),
            ),
          users: (data: Deal) =>
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
