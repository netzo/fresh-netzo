import type { JSX } from "preact";
import type { Plugin } from "$fresh/src/server/mod.ts";
import AppLayout from "./_app.tsx";

export type AppLayoutOptions = {
  title?: string;
  description?: string;
  favicon?: string;
  image?: JSX.HTMLAttributes<HTMLImageElement>;
};

export type AppLayoutState = {
  sessionId: string;
  isAuthenticated: boolean;
};

export const appLayout = (options: AppLayoutOptions): Plugin => {
  return {
    name: "appLayout",
    routes: [
      {
        path: "/_app",
        handler: (_req, ctx) => {
          return ctx.render(AppLayout(options));
        },
      },
    ],
  };
};
