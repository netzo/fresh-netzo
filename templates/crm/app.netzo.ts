#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes dev.ts
import { createApp, start } from "netzo/framework/mod.ts";

export const config = await createApp({
  auth: { enabled: true },
  layout: {
    enabled: true,
    nav: {
      items: [
        {
          text: "Overview",
          items: [
            { icon: "mdi-home", text: "Home", href: "/" },
            { icon: "mdi-web", text: "Website", href: "https://netzo.io/" },
          ],
        },
      ],
    },
    header: {
      title: "{{project.name}}",
      description: "{{project.description}}",
      image: "{{project.avatar}}",
    },
    footer: {
      innerHTML: `<a href="https://netzo.io/" target="_blank">
  <img
    src="https://netzo.io/logos/built-with-netzo-light.svg"
    alt="Built with Netzo"
    class="h-[32px]"
  />
</a>`,
    },
  },
  theme: {
    enabled: true,
    color: "red",
    radius: 1.0,
  },
});

await start(config);
