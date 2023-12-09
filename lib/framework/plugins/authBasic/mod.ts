import { Plugin } from "netzo/deps/$fresh/src/server/mod.ts";

export type AuthBasicOptions = {
  path: string;
  username?: string;
  password?: string;
  realm?: string;
};

export const authBasic = (options: AuthBasicOptions): Plugin => {
  const {
    username = Deno.env.get("BASIC_AUTH_USERNAME"),
    password = Deno.env.get("BASIC_AUTH_PASSWORD"),
    realm = Deno.env.get("BASIC_AUTH_REALM") ?? "Fake Realm",
  } = options;
  if (!username || !password) {
    throw new Error("BASIC_AUTH_USERNAME and BASIC_AUTH_PASSWORD must be set");
  }

  // NOTE: logout by navigating to another page to force browser to trigger
  // basic auth prompt again e.g. by navigating to http://log:out@localhost:8000/

  return {
    name: "authBasic",
    middlewares: [
      {
        path: options.path,
        middleware: {
          handler: async (req, ctx) => {
            const credentials = `Basic ${btoa(`${username}:${password}`)}`;
            console.log(credentials === req.headers.get("Authorization"));
            if (req.headers.get("Authorization") !== credentials) {
              const headers = { "WWW-Authenticate": `Basic realm="${realm}"` };
              return new Response("Unauthorized", { status: 401, headers });
            }
            return await ctx.next();
          },
        },
      },
    ],
  };
};
