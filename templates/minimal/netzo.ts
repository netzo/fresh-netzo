import { Netzo } from "netzo/mod.ts";

export const netzo = await Netzo({
  api: {
    path: "/api",
    idField: "id",
    resources: {},
  },
  components: {
    theme: {},
  },
  pages: {},
});

if (import.meta.main) netzo.start();
