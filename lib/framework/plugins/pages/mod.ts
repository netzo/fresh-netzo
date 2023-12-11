import type { Plugin } from "../../../deps/$fresh/src/server/mod.ts";
import type { Project } from "../../../framework/mod.ts";
import _404 from "./routes/_404.tsx";
import _500 from "./routes/_500.tsx";

export type PagesOptions = Project["config"]["pages"];

export type PagesState = {};

export const pages = (options?: PagesOptions): Plugin => {
  return {
    name: "pages",
    routes: [
      ...(options?.pages?._404?.enabled
        ? [{ path: "/_404", component: _404 }]
        : []),
      ...(options?.pages?._500?.enabled
        ? [{ path: "/_500", component: _500 }]
        : []),
    ],
  };
};
