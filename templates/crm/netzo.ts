#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes dev.ts
import { Netzo } from "netzo/mod.ts";
import { DenoKvService } from "../../lib/api/adapters/denokv.ts";
import { HttpService } from "../../lib/api/adapters/http.ts";
import { createApi } from "netzo/apis/_create-api/mod.ts";

const kv = await Deno.openKv();

const api = createApi({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "content-type": "application/json",
  },
});

export const netzo = await Netzo({
  // auth: Deno.env.get("DENO_REGION")
  //   ? {
  //     providers: {
  //       netzo: {},
  //     },
  //   }
  //   : undefined,
  auth: {
    providers: {
      netzo: {},
    }
  },
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
        { text: "Overview", href: "/", icon: "mdi-home" },
        { text: "Deals", href: "/deals", icon: "i-mdi-home" },
        {},
        { text: "Accounts", href: "/accounts" },
        { text: "Contacts", href: "/contacts" },
        { text: "Invoices", href: "/invoices" },
      ],
      ui: {
        // root: { class: "bg-black dark:bg-red-500 text-white" },
        // navItem: { class: "text-green-500 px-20px" },
        // navItemIcon: { className: "text-red-500 px-20px" },
      },
    },
    header: {
      title: "CRM Template",
      description: "A starter template for a custom CRM app",
      ui: {
        // root: { class: "bg-black dark:bg-red-500 text-white" },
      },
    },
    footer: {
      innerHTMLLeft: `${new Date().getFullYear()} &copy; Netzo`,
      innerHTMLRight:
        `<a href="mailto:hello@netzo.io" target="_blank">Contact us</a>`,
      ui: {
        // root: { class: "bg-black dark:bg-red-500 text-white" },
      },
    },
  },
  api: {
    // apiKey: "123",
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
