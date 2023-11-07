import { Plugin } from "$fresh/server.ts";
import type { NetzoState } from "netzo/config/mod.ts";

export type AuthBasicOptions = {
  path: string;
  username?: string;
  password?: string;
  realm?: string;
};

export const authBasic = (options: AuthBasicOptions): Plugin<NetzoState> => {
  const {
    username = Deno.env.get("BASIC_AUTH_USERNAME"),
    password = Deno.env.get("BASIC_AUTH_PASSWORD"),
    realm = Deno.env.get("BASIC_AUTH_REALM") ?? "Fake Realm",
  } = options;
  if (!username || !password) {
    throw new Error("BASIC_AUTH_USERNAME and BASIC_AUTH_PASSWORD must be set");
  }

  return {
    name: "authBasic",
    middlewares: [
      {
        middleware: {
          handler: async (req, ctx) => {
            if (
              req.headers.get("Authorization") !==
                `Basic ${btoa(`${username}:${password}`)}`
            ) {
              const headers = new Headers({
                "WWW-Authenticate": `Basic realm="${realm}"`,
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
