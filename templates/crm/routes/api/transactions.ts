import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/mod.ts";
import { authenticate, log, resolve } from "netzo/plugins/api/hooks/mod.ts";
import { netzo } from "@/netzo.ts";

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
          issuerAccount: (data) =>
            netzo.resource("accounts").get(data.issuerAccountId),
          receiverAccount: (data) =>
            netzo.resource("accounts").get(data.receiverAccountId),
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
