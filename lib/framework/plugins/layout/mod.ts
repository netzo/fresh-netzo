import type { Plugin } from "../../../deps/$fresh/server.ts";
import type { Project } from "../../../framework/mod.ts";
import _App from "./routes/_app.tsx";
import _404 from "./routes/_404.tsx";
import _500 from "./routes/_500.tsx";

export type LayoutOptions = Project["config"]["layout"];

// deno-lint-ignore ban-types
export type LayoutState = {};

export const layout = (_options?: LayoutOptions): Plugin => {
  return {
    name: "layout",
    routes: [
      { path: "/_app", component: _App },
      { path: "/_404", component: _404 },
      { path: "/_500", component: _500 },
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
