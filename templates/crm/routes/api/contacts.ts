import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/mod.ts";
import { authenticate, log } from "netzo/plugins/api/hooks/mod.ts";

export const contacts = defineApiEndpoint({
  name: "contacts",
  idField: "id",
  resource: DenoKvResource({ prefix: ["contacts"] }),
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
