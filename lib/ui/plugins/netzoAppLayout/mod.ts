import type { JSX } from "preact";
import type { Plugin } from "$fresh/server.ts";
import AppLayout from "./app-layout.tsx";

export interface NetzoAppLayoutOptions {
  title?: string;
  description?: string;
  favicon?: string;
  image?: JSX.HTMLAttributes<HTMLImageElement>;
}

export const netzoAppLayout = (
  options: NetzoAppLayoutOptions = {
    title: "Built with Netzo",
    favicon: "/favicon.svg",
  },
): Plugin => {
  return {
    name: "netzoAppLayout",
    routes: [
      { path: "/_app", component: AppLayout(options) },
    ],
  };
};
