#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes dev.ts
import { Netzo } from "netzo/core/mod.ts";
import { DenoKvService } from "netzo/services/denokv.ts";
import { HttpService } from "netzo/services/http.ts";
import { createApi } from "netzo/apis/_create-api/mod.ts";

const kv = await Deno.openKv();

const api = createApi({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "content-type": "application/json",
  },
});

export const netzo = await Netzo({
  auth: Deno.env.get("DENO_REGION")
    ? {
      providers: {
        netzo: {},
      },
    }
    : undefined,
  ui: {
    head: {
      title: "CRM Template | Netzo",
      description: "A starter template for a custom CRM app",
      favicon: "/favicon.svg",
      image: "/cover.svg",
    },
    nav: {
      title: "Netzo",
      image: "/favicon.svg",
      items: [
        { text: "Overview", href: "/", icon: "mdi-view-dashboard" },
        { text: "Deals", href: "/deals", icon: "mdi-view-column" },
        {},
        { text: "Accounts", href: "/accounts", icon: "mdi-account-group" },
        { text: "Contacts", href: "/contacts", icon: "mdi-contacts" },
        { text: "Invoices", href: "/invoices", icon: "mdi-receipt" },
      ],
    },
    header: {
      title: "CRM Template",
      description: "A starter template for a custom CRM app",
    },
    footer: {
      innerHTMLLeft: `${new Date().getFullYear()} &copy; Netzo`,
      innerHTMLRight:
        `<a href="mailto:hello@netzo.io" target="_blank">Contact us</a>`,
    },
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
