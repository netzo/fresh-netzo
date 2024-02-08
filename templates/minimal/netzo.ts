import { Netzo } from "netzo/mod.ts";

export const netzo = await Netzo({
  // auth: Deno.env.get("DENO_REGION") ? { providers: { netzo: {} } } : undefined,
  api: {
    apiKey: Deno.env.get("NETZO_API_KEY"),
    path: "/api",
    idField: "id",
    resources: {},
  },
  components: {},
});

if (import.meta.main) netzo.start();
