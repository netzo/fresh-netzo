import type { Plugin } from "$fresh/server.ts";
import type { NetzoState } from "netzo/config/mod.ts";
import { ErrorPage404, ErrorPage500 } from "./error-pages.tsx";

export type ErrorPagesOptions = {
  404?: boolean;
  500?: boolean;
};

export const errorPages = (
  options: ErrorPagesOptions,
): Plugin<NetzoState> => {
  return {
    name: "errorPages",
    routes: [
      ...(options[404] === false
        ? []
        : [{ path: "/_404", component: ErrorPage404 }]),
      ...(options[500] === false
        ? []
        : [{ path: "/_500", component: ErrorPage500 }]),
    ],
  };
};
