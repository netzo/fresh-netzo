import type { JSX } from "preact";
import type { Plugin } from "https://deno.land/x/fresh@1.5.1/server.ts";
import { NetzoConfig } from "../../config.ts";
import AppLayout from "./app-layout.tsx";

export interface AppLayoutOptions {
  title?: string;
  description?: string;
  favicon?: string;
  image?: JSX.HTMLAttributes<HTMLImageElement>;
}

export interface AppLayoutState {
  options: NetzoConfig;
  sessionId: string;
  isAuthenticated: boolean;
}

export default (
  options: AppLayoutOptions = {
    title: "Built with Netzo",
    favicon: "/favicon.svg",
  },
): Plugin => {
  return {
    name: "appLayout",
    routes: [
      {
        path: "/_app",
        handler: async (req, ctx) => {
          return ctx.render(AppLayout(options));
        },
        //  component: AppLayout(options) },
      },
    ],
  };
};
