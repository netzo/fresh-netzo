// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Plugin } from "$fresh/server.ts";
import { isGitHubSetup } from "netzo/authentication/utils/github.ts";
import { redirect } from "netzo/authentication/utils/http.ts";

export default {
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
