import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/mod.ts";
import { authenticate, log, resolve } from "netzo/plugins/api/hooks/mod.ts";
import type { Account } from "@/data/accounts.ts";
import { resource } from "@/netzo.ts";

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
          account: (data: Account) => resource("accounts").get(data.accountId),
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
