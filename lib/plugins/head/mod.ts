import type { JSX } from "preact";
import type { Plugin } from "$fresh/server.ts";
import Head from "./Head.tsx";

export type HeadOptions = {
  title?: string;
  description?: string;
  favicon?: string;
  image?: JSX.HTMLAttributes<HTMLImageElement>;
};

export type HeadState = {
  sessionId: string;
  isAuthenticated: boolean;
};

export const head = (options: HeadOptions): Plugin => {
  options.title ||= "Built with Netzo";
  options.favicon ||= "/favicon.svg";
  options.favicon ||= "/favicon.svg";
  options.image ||= "/cover.svg";

  return {
    name: "head",
    routes: [
      {
        path: "/_app",
        handler: (_req, ctx) => {
          return ctx.render(Head(options));
        },
      },
    ],
  };
};
