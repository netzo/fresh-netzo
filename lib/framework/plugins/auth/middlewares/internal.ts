import type { PluginMiddleware } from "../../../../deps/$fresh/src/server/types.ts";
import type { NetzoState } from "../../../../framework/mod.ts";
import { logInfo } from "../../../../framework/utils/console.ts";

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
        if (!["route"].includes(ctx.destination)) return await ctx.next();

        if (Deno.env.get("NETZO_ENV") === "development") {
          logInfo(`[dev] Skipping internal auth middleware...`);
          return await ctx.next();
        }

        // const host = req.headers.get("host"); // e.g. my-project-906698.netzo.io
        const origin = req.headers.get("origin"); // e.g. https://my-project-906698.netzo.io
        const referer = req.headers.get("referer"); // SOMETIMES SET e.g. https://app.netzo.io/some-path

        // simple heuristics to determine source of request:
        const assertIsApp = (url: string) =>
          !!url && new URL(url).host.endsWith("netzo.io");
        const isApp = assertIsApp(origin!) || assertIsApp(referer!);

        ctx.state.auth = { ...ctx.state.auth, origin, referer, isApp };

        if (!isApp) {
          const { NETZO_PROJECT_UID, NETZO_APP_URL } = Deno.env.toObject();
          const url = `${NETZO_APP_URL}/projects/${NETZO_PROJECT_UID}`;
          return Response.redirect(url, 302);
        }

        return await ctx.next();
      },
    },
  },
];
