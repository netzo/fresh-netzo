import type { Transaction } from "@/data/transactions.ts";
import { resource } from "@/netzo.ts";
import { authenticate, log, resolve } from "netzo/plugins/api/hooks/mod.ts";
import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/mod.ts";

export const transactions = defineApiEndpoint({
  name: "transactions",
  idField: "id",
  resource: DenoKvResource({ prefix: ["transactions"] }),
  hooks: {
    all: [
      authenticate(),
      log(),
      resolve({
        after: {
          issuerAccount: (data: Transaction) =>
            resource("accounts").get(data.issuerAccountId),
          receiverAccount: (data: Transaction) =>
            resource("accounts").get(data.receiverAccountId),
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
