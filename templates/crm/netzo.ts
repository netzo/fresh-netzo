import { Netzo } from "netzo/mod.ts";
import { DenoKvResource } from "netzo/plugins/api/resources/denokv.ts";
import { logRuntime } from "netzo/plugins/api/hooks.ts";

const kv = await Deno.openKv();

export const netzo = await Netzo({
  // auth: Deno.env.get("DENO_REGION") ? { providers: { netzo: {} } } : undefined,
  api: {
    // apiKey: Deno.env.get("NETZO_API_KEY"),
    path: "/api",
    idField: "id",
    resources: {
      accounts: DenoKvResource({
        kv,
        prefix: ["accounts"],
        hooks: {
          find: [logRuntime],
        },
      }),
      contacts: DenoKvResource({ kv, prefix: ["contacts"] }),
      deals: DenoKvResource({ kv, prefix: ["deals"] }),
      interactions: DenoKvResource({ kv, prefix: ["interactions"] }),
      invoices: DenoKvResource({ kv, prefix: ["invoices"] }),
      transactions: DenoKvResource({ kv, prefix: ["transactions"] }),
      users: DenoKvResource({ kv, prefix: ["users"] }),
    },
    hooks: {
      resources: {
        account: [logRuntime],
      },
    },
  },
  components: {},
});

if (import.meta.main) netzo.start();
