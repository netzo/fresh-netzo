import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/mod.ts";
import { authenticate, log } from "netzo/plugins/api/hooks/mod.ts";

export const transactions = defineApiEndpoint({
  name: "transactions",
  idField: "id",
  resource: DenoKvResource({ prefix: ["transactions"] }),
  hooks: {
    all: [authenticate(), log()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});
