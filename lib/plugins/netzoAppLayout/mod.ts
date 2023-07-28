import type { Plugin } from "../deps.ts";
import AppLayout from "./AppLayout.tsx"

export interface NetzoAppLayoutOptions {
  title: string;
}

export const netzoAppLayout = (options: NetzoAppLayoutOptions = { title: 'Built with Netzo' }): Plugin => {
  return {
    name: "netzoAppLayout",
    routes: [
      { path: "/_app", component: AppLayout(options) }
    ]
  };
};
