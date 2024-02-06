#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes dev.ts
import { Netzo } from "netzo/core/mod.ts";
import { DenoKvService } from "netzo/services/denokv.ts";
import { HttpService } from "netzo/services/http.ts";
import { createApi } from "netzo/integrations/create-api/mod.ts";

const kv = await Deno.openKv();

const api = createApi({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "content-type": "application/json",
  },
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
    services: {
      accounts: DenoKvService({ kv, prefix: ["accounts"] }),
      contacts: DenoKvService({ kv, prefix: ["contacts"] }),
      deals: DenoKvService({ kv, prefix: ["deals"] }),
      interactions: DenoKvService({ kv, prefix: ["interactions"] }),
      invoices: DenoKvService({ kv, prefix: ["invoices"] }),
      transactions: DenoKvService({ kv, prefix: ["transactions"] }),
      users: DenoKvService({ kv, prefix: ["users"] }),
      todos: HttpService({ client: api.todos }),
    },
  },
});

if (import.meta.main) netzo.start();
