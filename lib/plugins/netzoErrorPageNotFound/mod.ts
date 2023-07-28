import type { Plugin, UnknownPageProps } from "../deps.ts";
import ErrorPageNotFound from "./ErrorPageNotFound.tsx"

// deno-lint-ignore no-empty-interface
export interface NetzoErrorPageNotFoundOptions extends UnknownPageProps { }

export const netzoErrorPageNotFound = (options: NetzoErrorPageNotFoundOptions): Plugin => {
  return {
    name: "netzoErrorPageNotFound",
    routes: [
      { path: "/_404", component: ErrorPageNotFound(options) }
    ]
  };
};
