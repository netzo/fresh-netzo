#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes dev.ts
import { createNetzoApp, start } from "netzo/framework/mod.ts";
import manifest from "./fresh.gen.ts";

export const config = await createNetzoApp({
  ui: {
    nav: {
      items: [
        { icon: "mdi-contacts", text: "Contacts", href: "/contacts" },
        { icon: "mdi-account", text: "Clients", href: "/clients" },
        { icon: "mdi-receipt", text: "Invoices", href: "/invoices" },
      ],
    },
  },
});

await start(manifest, config);
