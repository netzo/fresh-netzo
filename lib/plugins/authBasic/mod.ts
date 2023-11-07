import { Plugin } from "$fresh/server.ts";
import type { NetzoState } from "netzo/config/mod.ts";

export type AuthBasicOptions = {
  path: string;
};

export const authBasic = (options: AuthBasicOptions): Plugin<NetzoState> => {
  const USER = Deno.env.get("BASIC_AUTH_USER");
  const PASSWORD = Deno.env.get("BASIC_AUTH_PASSWORD");
  const REALM = Deno.env.get("BASIC_AUTH_REALM");
  if (!USER || !PASSWORD) {
    throw new Error("BASIC_AUTH_USER and BASIC_AUTH_PASSWORD must be set");
  }

  return {
    name: "authBasic",
    middlewares: [
      {
        middleware: {
          handler: async (req, ctx) => {
            if (
              req.headers.get("Authorization") !==
                `Basic ${btoa(`${USER}:${PASSWORD}`)}`
            ) {
              const headers = new Headers({
                "WWW-Authenticate": `Basic realm="${REALM || "Fake Realm"}"`,
              });
              return new Response("Unauthorized", { status: 401, headers });
            }
            return await ctx.next();
          },
        },
        path: options.path,
      },
    ],
  };
};
