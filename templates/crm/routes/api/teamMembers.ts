// import { authenticate, log, resolve } from "netzo/plugins/api/hooks/mod.ts";
import { defineApiEndpoint } from "netzo/plugins/api/plugin.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/mod.ts";

export const teamMembers = defineApiEndpoint({
  name: "teamMembers",
  idField: "id",
  resource: DenoKvResource({ prefix: ["teamMembers"] }),
  hooks: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});
