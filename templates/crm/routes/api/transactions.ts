import { authenticate, log, resolve } from "netzo/plugins/api/hooks/mod.ts";
import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/mod.ts";
import type { Account } from "../../data/accounts.ts";
import type { Transaction } from "../../data/transactions.ts";
import { $client } from "../../netzo.config.ts";

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
            $client.accounts.get(data.issuerAccountId) as Account,
          receiverAccount: (data: Transaction) =>
            $client.accounts.get(data.receiverAccountId) as Account,
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
