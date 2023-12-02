import type { Plugin } from "$fresh/src/server/mod.ts";
import type { NetzoState } from "netzo/config/mod.ts";
import { ErrorPage404, ErrorPage500 } from "./error-pages.tsx";

export const errorPages = (): Plugin<NetzoState> => {
  return {
    name: "errorPages",
    routes: [
      { path: "/_404", component: ErrorPage404 },
      { path: "/_500", component: ErrorPage500 },
    ],
  };
};
