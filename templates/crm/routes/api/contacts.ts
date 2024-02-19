import { authenticate, log, resolve } from "netzo/plugins/api/hooks/mod.ts";
import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/mod.ts";
import type { Account } from "../../data/accounts.ts";
import type { Contact } from "../../data/contacts.ts";
import { $client } from "../../netzo.config.ts";

export const contacts = defineApiEndpoint({
  name: "contacts",
  idField: "id",
  resource: DenoKvResource({ prefix: ["contacts"] }),
  hooks: {
    all: [
      authenticate(),
      log(),
      resolve({
        after: {
          account: (data: Contact) => $client.accounts.get(data.accountId) as Account,
        },
      }),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});
