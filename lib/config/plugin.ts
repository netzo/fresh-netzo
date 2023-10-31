import type { Plugin } from "$fresh/server.ts";
import type { NetzoConfig } from "netzo/config.ts";

export type VisibilityOptions = {
  level: "private" | "public";
};

export type VisibilityState = {};

/**
 * A fresh plugin that registers middleware to handle
 * visibility of projects based on the `visibility` option.
 */
export const visibilityPlugins = (): Plugin[] => {
  return [
    {
      name: "visibility-plugin",
      middlewares: [
        {
          path: "/",
          middleware: {
            handler: async (req, ctx) => {
              if (!Deno.env.get("DENO_REGION")) return await ctx.next(); // skip in development

              if (!["route"].includes(ctx.destination)) return await ctx.next();

              const { level } = ctx.state.config.visibility!;

              // const host = req.headers.get("host"); // e.g. my-project-906698.netzo.io
              const origin = req.headers.get("origin"); // e.g. https://my-project-906698.netzo.io
              const referer = req.headers.get("referer"); // SOMETIMES SET e.g. https://app.netzo.io/some-path

              // simple heuristics to determine source of request:
              const isApp = (url: string) =>
                !!url && new URL(url).host.endsWith("netzo.io");
              const is = { app: isApp(origin!) || isApp(referer!) };

              // console.debug({ destination: ctx.destination, origin, referer, is });

              switch (level) {
                case "private": {
                  if (!is.app) {
                    throw new Error(
                      "Private deployments cannot be accessed externally",
                    );
                  }
                  return await ctx.next();
                }
                case "public":
                default: {
                  return await ctx.next();
                }
              }
            },
          },
        },
      ],
    },
  ];
};
