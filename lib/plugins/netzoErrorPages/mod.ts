import type { Plugin } from "../deps.ts";
import { ErrorPage404, ErrorPage500 } from "./ErrorPages.tsx";

export interface NetzoErrorPagesOptions {
  404?: boolean
  500?: boolean
}

export const netzoErrorPages = (
  options: NetzoErrorPagesOptions = { '404': true, '500': true }
): Plugin => {
  return {
    name: "netzoErrorPages",
    routes: [
      ...(options[404] ? [{ path: "/_404", component: ErrorPage404 }] : []),
      ...(options[500] ? [{ path: "/_500", component: ErrorPage500 }] : [])
    ]
  };
};
