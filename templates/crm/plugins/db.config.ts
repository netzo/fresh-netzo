import { authenticate, log } from "netzo/plugins/db/hooks/mod.ts";
import { createDatabase } from "netzo/plugins/db/mod.ts";
import { defineDbConfig } from "netzo/plugins/db/plugin.ts";

export const kv = await Deno.openKv();

export const db = createDatabase(kv);

export default defineDbConfig({
  kv,
  apiKey: Deno.env.get("NETZO_API_KEY"),
  path: "/api",
  collections: [
    {
      name: "accounts",
      idField: "id",
      hooks: {
        all: [authenticate(), log()],
      },
    },
    {
      name: "activities",
      idField: "id",
      hooks: {
        all: [authenticate(), log()],
      },
    },
    {
      name: "contacts",
      idField: "id",
      hooks: {
        all: [authenticate(), log()],
      },
    },
    {
      name: "deals",
      idField: "id",
      hooks: {
        all: [authenticate(), log()],
      },
    },
  ],
});
