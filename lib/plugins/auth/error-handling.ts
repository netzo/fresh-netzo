import type { PluginMiddleware } from "$fresh/src/server/types.ts";
import { errors } from "std/http/http_errors.ts";
import { redirect } from "netzo/plugins/auth/utils/http.ts";
import type { NetzoStateAuth } from "./mod.ts";

export const errorHandlingMiddlewares: PluginMiddleware<NetzoStateAuth>[] = [
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