import type { Plugin } from "$fresh/server.ts";
import { isGitHubSetup } from "netzo/auth/utils/github.ts";
import { redirect } from "netzo/auth/utils/http.ts";
import { NetzoConfig } from "netzo/config.ts";

export default (_config: NetzoConfig): Plugin => {
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
