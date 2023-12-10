import type { PluginMiddleware } from "../../../deps/$fresh/src/server/types.ts";
import { errors } from "../../../deps/std/http/http_errors.ts";
import { redirect } from "../../../framework/plugins/auth/utils/http.ts";
import type { NetzoState } from "../../../framework/mod.ts";

export const errorHandlingMiddlewares: PluginMiddleware<NetzoState>[] = [
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
