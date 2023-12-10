import type { Plugin } from "../../../deps/$fresh/src/server/mod.ts";
import type { Project } from "../../../framework/mod.ts";
import _App from "./routes/_app.tsx";

export type LayoutOptions = Project["layout"];

export type LayoutState = {};

export const layout = (options?: LayoutOptions): Plugin => {
  return {
    name: "layout",
    routes: [
      { path: "/_app", component: _App },
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
