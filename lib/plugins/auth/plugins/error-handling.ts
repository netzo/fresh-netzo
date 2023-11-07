import type { Plugin } from "$fresh/server.ts";
import { errors } from "std/http/http_errors.ts";
import { redirect } from "netzo/plugins/auth/utils/http.ts";
import type { NetzoState as _NetzoState } from "../../../config/mod.ts";

type NetzoState = Required<Pick<_NetzoState, 'auth'>> & _NetzoState

export const errorHandling = (): Plugin<NetzoState> => {
  return {
    name: "error-handling",
    middlewares: [
      {
        path: "/(app)",
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
    ],
  };
};
