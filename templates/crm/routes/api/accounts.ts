import { authenticate, log, validate } from "netzo/plugins/api/hooks/mod.ts";
import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/mod.ts";
import { accountSchema } from "../../data/accounts.ts";

export const accounts = defineApiEndpoint({
  name: "accounts",
  idField: "id",
  resource: DenoKvResource({ prefix: ["accounts"] }),
  hooks: {
    all: [authenticate(), log(), validate(accountSchema)],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});
