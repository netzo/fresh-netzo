import type { Plugin, ErrorPageProps } from "../deps.ts";
import ErrorPage from "./ErrorPage.tsx"

// deno-lint-ignore no-empty-interface
export interface NetzoErrorPageOptions extends ErrorPageProps { }

export const netzoErrorPage = (options: NetzoErrorPageOptions): Plugin => {
  return {
    name: "netzoErrorPage",
    routes: [
      { path: "/_500", component: ErrorPage(options) }
    ]
  };
};
