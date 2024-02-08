#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes/ netzo.ts

import { Netzo } from "netzo/mod.ts";
import { DenoKvResource } from "netzo/resources/denokv.ts";
import { createApi } from "netzo/integrations/create-api/mod.ts";

const kv = await Deno.openKv();

export const netzo = await Netzo({
  // auth: Deno.env.get("DENO_REGION") ? { providers: { netzo: {} } } : undefined,
  api: {
    // apiKey: Deno.env.get("NETZO_API_KEY"),
    path: "/api",
    idField: "id",
    resources: {
      accounts: DenoKvResource({ kv, prefix: ["accounts"] }),
      contacts: DenoKvResource({ kv, prefix: ["contacts"] }),
      deals: DenoKvResource({ kv, prefix: ["deals"] }),
      interactions: DenoKvResource({ kv, prefix: ["interactions"] }),
      invoices: DenoKvResource({ kv, prefix: ["invoices"] }),
      transactions: DenoKvResource({ kv, prefix: ["transactions"] }),
      users: DenoKvResource({ kv, prefix: ["users"] }),
    },
  },
  components: {
    theme: {},
  },
  pages: {},
});

if (import.meta.main) netzo.start();
