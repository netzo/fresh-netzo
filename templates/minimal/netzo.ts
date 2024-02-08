#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes/ netzo.ts

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
