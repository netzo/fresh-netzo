import type { MiddlewareHandler, Plugin } from "../deps.ts";

export interface NetzoAuthOptions {
  visibility?: "private" | "public";
}

const createHandler = (
  options: NetzoAuthOptions = { visibility: "private" },
): MiddlewareHandler => {
  return async (req, ctx) => {
    if (["internal"].includes(ctx.destination)) return await ctx.next();

    switch (options.visibility) {
      case "private": {
        const origin = "app.netzo.io";
        if (![origin].includes(req.headers.get("origin")!)) {
          const error =
            `Forbidden: private projects can only be accessed from https://${origin}`;
          return new Response(error, {
            status: 403,
            statusText: "Forbidden",
          });
        }
        const response = await ctx.next();
        return response;
      }
      case "public":
      default: {
        const response = await ctx.next();
        return response;
      }
    }
  };
};

export const netzoAuth = (options: NetzoAuthOptions = {}): Plugin => {
  return {
    name: "netzoAuth",
    middlewares: [
      { path: "/", middleware: { handler: createHandler(options) } },
    ],
  };
};
