import { authenticate, log } from "netzo/plugins/api/hooks/mod.ts";
import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/mod.ts";

export const contacts = defineApiEndpoint({
  name: "contacts",
  idField: "id",
  resource: DenoKvResource({ prefix: ["contacts"] }),
  hooks: {
    all: [
      authenticate(),
      log(),
      // FIXME: returns FetchError:  (500 Internal Server Error)
      // resolve({
      //   after: {
      //     account: (data: Contact) =>
      //       api.accounts[data.accountId].get<Account>(),
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
