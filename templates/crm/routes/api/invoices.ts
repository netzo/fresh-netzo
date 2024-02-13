import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/mod.ts";
import { authenticate, log } from "netzo/plugins/api/hooks/mod.ts";

export const invoices = defineApiEndpoint({
  name: "invoices",
  idField: "id",
  resource: DenoKvResource({ prefix: ["invoices"] }),
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
