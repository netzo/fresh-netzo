import { ComponentChildren } from "preact";
import type { Plugin } from "$fresh/server.ts";
import Head from "./Head.tsx";

export type HeadOptions = {
  title?: string;
  description?: string;
  favicon?: string;
  image?: string;
  children?: ComponentChildren;
};

export type HeadState = {
  options: HeadOptions;
};

export const head = (options: HeadOptions): Plugin => {
  options.title ??= "App | Netzo";
  options.description ??= "Built with Netzo";
  options.favicon ??= "/favicon.svg";
  options.favicon ??= "/favicon.svg";
  options.image ??= "/cover.svg";

  return {
    name: "head",
    middlewares: [
      {
        path: "/",
        middleware: {
          handler: async (_req, ctx) => {
            ctx.state.head = { options };
            return await ctx.next();
          },
        },
      },
    ],
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
