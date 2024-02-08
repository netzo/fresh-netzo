import { Netzo } from "netzo/mod.ts";

export const netzo = await Netzo({
  ui: {
    theme: {},
  },
  api: {
    path: "/api",
    idField: "id",
    resources: {},
  },
});

if (import.meta.main) netzo.start();
