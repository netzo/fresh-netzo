import { authenticate, log } from "netzo/plugins/api/hooks/mod.ts";
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
      // FIXME: returns FetchError:  (500 Internal Server Error)
      // resolve({
      //   after: {
      //     issuerAccount: (data: Transaction) =>
      //       api.accounts[data.issuerAccountId].get<Account>(),
      //     receiverAccount: (data: Transaction) =>
      //       api.accounts[data.receiverAccountId].get<Account>(),
      //   },
      // }),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});
