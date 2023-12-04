import type { PluginMiddleware } from "$fresh/src/server/types.ts";
import { errors } from "std/http/http_errors.ts";
import { redirect } from "netzo/plugins/portal/utils/http.ts";
import type { PortalState } from "./mod.ts";

export const errorHandlingMiddlewares: PluginMiddleware<PortalState>[] = [
  {
    path: "/",
    middleware: {
      async handler(_req, ctx) {
        try {
          return await ctx.next();
        } catch (error) {
          if (error instanceof errors.Unauthorized) {
            return redirect("/oauth/signin");
          }
          throw error;
        }
      },
    },
  },
];
