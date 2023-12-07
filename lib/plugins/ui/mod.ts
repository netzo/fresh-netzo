import type { Plugin } from "$fresh/src/server/mod.ts";
import type { Project } from "../../config/mod.ts";
import _App from "./_app.tsx";

export type UiOptions = Project["ui"];

export type UiState = {};

export const ui = (options?: UiOptions): Plugin => {
  return {
    name: "ui",
    routes: [
      {
        path: "/_app",
        component: _App,
      },
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
