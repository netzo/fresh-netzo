import type { JSX } from "preact";
import type { Plugin } from "$fresh/server.ts";
import AppLayout from "./app-layout.tsx";

export interface AppLayoutOptions {
  title?: string;
  description?: string;
  favicon?: string;
  image?: JSX.HTMLAttributes<HTMLImageElement>;
}

export const appLayout = (
  options: AppLayoutOptions = {
    title: "Built with Netzo",
    favicon: "/favicon.svg",
  },
): Plugin => {
  return {
    name: "appLayout",
    routes: [
      { path: "/_app", component: AppLayout(options) },
    ],
  };
};
