import type { Plugin } from "$fresh/server.ts";
import type { NetzoState } from "netzo/config/mod.ts";
import { ErrorPage404, ErrorPage500 } from "./error-pages.tsx";

export type ErrorPagesOptions = {
  404?: boolean;
  500?: boolean;
};

export const errorPages = (
  options: ErrorPagesOptions = { "404": true, "500": true },
): Plugin<NetzoState> => {
  return {
    name: "errorPages",
    routes: [
      ...(options[404] ? [{ path: "/_404", component: ErrorPage404 }] : []),
      ...(options[500] ? [{ path: "/_500", component: ErrorPage500 }] : []),
    ],
  };
};
