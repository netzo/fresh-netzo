import { authenticate, log } from "netzo/plugins/api/hooks/mod.ts";
import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/mod.ts";

export const notes = defineApiEndpoint({
  name: "notes",
  idField: "id",
  resource: DenoKvResource({ prefix: ["notes"] }),
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
