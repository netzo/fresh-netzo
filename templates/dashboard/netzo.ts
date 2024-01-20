#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes dev.ts
import { Netzo } from "../../lib/core/mod.ts";

export const netzo = await Netzo({
  ui: {
    head: {
      title: "Air Quality Dashboard Template | Netzo",
      description: "A starter template for an Air Quality dashboard",
      favicon: "/favicon.svg",
      image: "/cover.svg",
    },
    // nav: {
    //   title: "Netzo",
    //   image: "/favicon.svg",
    //   items: [
    //     { text: "Overview", href: "/" },
    //     { text: "Historical", href: "/historical" },
    //   ],
    // },
    header: {
      title: "Air Quality Dashboard Template",
      description: "A starter template for an Air Quality dashboard",
    },
    footer: {
      innerHTMLLeft: `${new Date().getFullYear()} &copy; Netzo`,
      innerHTMLRight:
        `<a href="mailto:hello@netzo.io" target="_blank">Contact us</a>`,
    },
  },
});

if (import.meta.main) netzo.start();
