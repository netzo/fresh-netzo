import { createDatabase } from "netzo/plugins/db/mod.ts";
import { defineDbConfig } from "netzo/plugins/db/plugin.ts";

export const kv = await Deno.openKv();

export const db = createDatabase(kv);

export default defineDbConfig({
  kv,
  apiKey: Deno.env.get("NETZO_API_KEY"),
  collections: [
    { name: "accounts", idField: "id" },
    { name: "activities", idField: "id" },
    { name: "contacts", idField: "id" },
    { name: "deals", idField: "id" },
  ],
});
