import { MiddlewareHandler } from "./deps.ts";

export type Visibility = "private" | "public";

export const allow = (
  visibility: Visibility = "private",
): MiddlewareHandler => {
  return async (req, ctx) => {
    switch (visibility) {
      case "private": {
        if (!["app.netzo.io"].includes(req.headers.get("origin"))) {
          const error =
            `Forbidden: private project can only be accessed from https://app.netzo.io`;
          return new Response(error, {
            status: 403,
            statusText: "Forbidden",
          });
        }
        return await ctx.next();
      }
      case "public": {
        return await ctx.next();
      }
    }
  };
};
