import type { PluginMiddleware } from "../../../deps/$fresh/src/server/types.ts";
import type { NetzoState } from "../../../framework/mod.ts";

export type AuthInternalState = {
  origin: string | null;
  referer: string | null;
  isApp: boolean;
};

/**
 * Middleware that redirects client to the app if auth is 'internal'
 */
export const internalMiddlewares: PluginMiddleware<NetzoState>[] = [
  {
    path: "/",
    middleware: {
      handler: async (req, ctx) => {
        if (Deno.env.get("NETZO_ENV") === "development") {
          return await ctx.next();
        }

        if (!["route"].includes(ctx.destination)) return await ctx.next();

        const { level = "internal" } = options ?? {};

        // const host = req.headers.get("host"); // e.g. my-project-906698.netzo.io
        const origin = req.headers.get("origin"); // e.g. https://my-project-906698.netzo.io
        const referer = req.headers.get("referer"); // SOMETIMES SET e.g. https://app.netzo.io/some-path

        // simple heuristics to determine source of request:
        const assertIsApp = (url: string) =>
          !!url && new URL(url).host.endsWith("netzo.io");
        const isApp = assertIsApp(origin!) || assertIsApp(referer!);

        ctx.state.auth = { ...ctx.state.auth, origin, referer, isApp };

        switch (level) {
          case "internal": {
            if (!isApp) {
              const {
                NETZO_PROJECT_UID,
                NETZO_APP_URL,
              } = Deno.env.toObject();
              const url = `${NETZO_APP_URL}/projects/${NETZO_PROJECT_UID}`;
              return Response.redirect(url, 302);
              // throw new Error(
              //   "Internal deployments cannot be authed externally",
              // );
            }
            return await ctx.next();
          }
          case "external":
          default: {
            return await ctx.next();
          }
        }
      },
    },
  },
];
