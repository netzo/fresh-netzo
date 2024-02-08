#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes/ dev.ts
import { Netzo } from "netzo/mod.ts";
import { DenoKvResource } from "netzo/resources/denokv.ts";
import { HttpResource } from "netzo/resources/http.ts";
import { createApi } from "netzo/integrations/create-api/mod.ts";

const kv = await Deno.openKv();

const api = createApi({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: { "content-type": "application/json" },
});

export const netzo = await Netzo({
  // auth: Deno.env.get("DENO_REGION") ? { providers: { netzo: {} } } : undefined,
  ui: {
    theme: {},
  },
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
      todos: HttpResource({ client: api.todos }),
    },
  },
});

if (import.meta.main) netzo.start();
