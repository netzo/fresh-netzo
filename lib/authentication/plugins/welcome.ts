import type { Plugin } from "$fresh/server.ts";
import { isGitHubSetup } from "netzo/authentication/utils/github.ts";
import { redirect } from "netzo/authentication/utils/http.ts";
import { AuthenticationOptions } from "netzo/authentication/plugin.ts";

export default (_options: AuthenticationOptions): Plugin => {
  return {
    name: "welcome",
    middlewares: [{
      path: "/",
      middleware: {
        handler: async (req, ctx) => {
          const { pathname } = new URL(req.url);
          return !isGitHubSetup() && pathname !== "/auth/welcome" &&
              ctx.destination === "route"
            ? redirect("/auth/welcome")
            : await ctx.next();
        },
      },
    }],
  } as Plugin;
};
