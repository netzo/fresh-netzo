#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes dev.ts
import { createNetzoApp, Netzo } from "netzo/framework/mod.ts";

export const netzo = await Netzo(); // [optional] loaded from .env file

export const app = await createNetzoApp({
  ui: {
    head: {
      title: "CRM Template | Netzo",
      description: "A starter template for a custom CRM app",
      favicon: "/favicon.svg",
      image: "/cover.svg",
    },
    nav: {
      title: "Netzo Company",
      image: "/favicon.svg",
      items: [
        { text: "Overview", href: "/" },
        { text: "Deals", href: "/deals" },
        {},
        { text: "Accounts", href: "/accounts" },
        { text: "Contacts", href: "/contacts" },
        { text: "Invoices", href: "/invoices" },
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
});

if (import.meta.main) app.start();
