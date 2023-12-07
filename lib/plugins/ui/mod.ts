import type { Plugin } from "$fresh/src/server/mod.ts";
import type { Project } from "https://esm.sh/@netzo/api@1.0.52/lib/client.d.ts";
import _App from "./_app.tsx";

export type UIOptions = Project["ui"];

export type UIState = {
  sessionId: string;
  isAuthenticated: boolean;
};

export const ui = (options?: UIOptions): Plugin => {
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
