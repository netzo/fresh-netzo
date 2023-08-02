import type { MiddlewareHandler, Plugin } from "../deps.ts";

export interface NetzoAuthOptions {
  visibility: "private" | "protected" | "public";
  tokens?: string[];
}

/*
The following lists the possible header combinations when
making a request to a project/deployment from the sources:

[app] allow all requests coming from app.netzo.io
  [app:iframe] allow embedding as <iframe src /> in app (e.g. in /projects/:uid page)
    • host: "app-launcher-fresh-131374.netzo.io"
    • origin: null
    • referer: "https://app.netzo.io/"
  [app:anchor-tag] allow navigating from an <a href /> (e.g. "open in new tab")
    • host: "app-launcher-fresh-131374.netzo.io"
    • origin: null
    • referer: "https://app.netzo.io/"
  [app:fetch] allow invoking from app (e.g. in /workspace/:workspaceId/projects/:id/requests page)
    • host: "6486ed1c1d0eaf9d649719ec.netzo.io" (NOTE: sends request to {deploymentId}.netzo.io for better latency)
    • origin: "https://app.netzo.io"
    • referer: "https://app.netzo.io/"
[external] from external HTTP clients (e.g. browser tab, curl, postman)
  • host: "app-launcher-fresh-131374.netzo.io"
  • origin: null
  • referer: null | "https://example.com/"
*/
const createHandler = (options: NetzoAuthOptions): MiddlewareHandler => {
  return async (req, ctx) => {
    if (["internal"].includes(ctx.destination)) return await ctx.next();

    const url = new URL(req.url);
    const token = req.headers.get("x-token") ?? url.searchParams.get("token");

    // const host = req.headers.get("host"); // e.g. my-project-906698.netzo.io
    const origin = req.headers.get("origin"); // e.g. https://my-project-906698.netzo.io
    const referer = req.headers.get("referer"); // SOMETIMES SET e.g. https://app.netzo.io/some-path

    // simple heuristics to determine source of request:
    const sources = {
      app: referer === "https://app.netzo.io/",
      external: !origin && !referer,
    };

    console.log({ ...options, origin, referer, sources });

    switch (options.visibility) {
      case "private": {
        // [external] deny all
        if (sources.external) {
          throw new Error("Private deployments cannot be accessed externally");
        } // [app] allow all
        else return await ctx.next();
      }
      case "protected": {
        // [external] allow if API key is provided and valid
        if (sources.external && token && !options.tokens?.includes(token)) {
          throw new Error("Protected deployments require a valid token");
        }

        // [app] allow all
        return await ctx.next();
      }
      case "public":
      default: {
        return await ctx.next();
      }
    }
  };
};

export const netzoAuth = (options: NetzoAuthOptions): Plugin => {
  return {
    name: "netzoAuth",
    middlewares: [
      { path: "/", middleware: { handler: createHandler(options) } },
    ],
  };
};
