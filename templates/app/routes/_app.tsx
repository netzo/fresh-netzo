import { defineApp } from "$fresh/src/server/mod.ts";
import { NetzoState } from "netzo/config/mod.ts";
import { Head, type HeadOptions } from "netzo/components/head.tsx";

export const head: HeadOptions = {
  title: "CRM | Netzo",
  description: "CRM app built with Netzo",
  favicon: "/favicon.svg",
  image: "/cover.svg",
};

export default defineApp<NetzoState>((req, ctx) => {
  return (
    <html className="w-full h-full overflow-x-hidden">
      <head>
        <Head {...head} href={ctx.url.href} />
        <link rel="stylesheet" href="/shadcn-ui.css" />
      </head>
      <body className="w-full h-full overflow-x-hidden">
        <ctx.Component />
      </body>
    </html>
  );
});
