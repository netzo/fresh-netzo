import type { Plugin } from "netzo/deps/$fresh/src/server/mod.ts";
import type { Project } from "netzo/framework/mod.ts";
import _App from "./routes/_app.tsx";
import _404 from "./routes/_404.tsx";
import _500 from "./routes/_500.tsx";

export type UiOptions = Project["ui"];

export type UiState = {};

export const ui = (options?: UiOptions): Plugin => {
  return {
    name: "ui",
    routes: [
      ...(options?.pages?._app?.enabled
        ? [{ path: "/_app", component: _App }]
        : []),
      ...(options?.pages?._404?.enabled
        ? [{ path: "/_404", component: _404 }]
        : []),
      ...(options?.pages?._500?.enabled
        ? [{ path: "/_500", component: _500 }]
        : []),
    ],
    islands: {
      baseLocation: import.meta.url,
      paths: [
        "./islands/header.tsx",
        "./islands/nav-item.tsx",
      ],
    },
  };
};
