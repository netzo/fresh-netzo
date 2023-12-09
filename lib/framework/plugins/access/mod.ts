import type { Plugin } from "netzo/deps/$fresh/src/server/mod.ts";
import type { Project } from "../../framework/mod.ts";

/*
The following lists the possible header combinations when
making a request to a project/deployment from any source:

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
[external] from external HTTP clients (e.g. browser tab, curl, postman, hoppscotch)
  • host: "app-launcher-fresh-131374.netzo.io"
  • origin: null
  • referer: null | "https://hoppscotch.io/"
*/

export type AccessOptions = Project["access"];

export type AccessState = {
  origin: string | null;
  referer: string | null;
  isApp: boolean;
};

/**
 * A fresh plugin that registers middleware to handle
 * access of projects based on the `access` option.
 */
export const access = (options: AccessOptions): Plugin => {
  return {
    name: "access",
    middlewares: [
      {
        path: "/",
        middleware: {
          handler: async (req, ctx) => {
            // if (Deno.env.get("NETZO_ENV") === "development") {
            //   return await ctx.next();
            // }

            if (!["route"].includes(ctx.destination)) return await ctx.next();

            const { level = "private" } = options ?? {};

            // const host = req.headers.get("host"); // e.g. my-project-906698.netzo.io
            const origin = req.headers.get("origin"); // e.g. https://my-project-906698.netzo.io
            const referer = req.headers.get("referer"); // SOMETIMES SET e.g. https://app.netzo.io/some-path

            // simple heuristics to determine source of request:
            const assertIsApp = (url: string) =>
              !!url && new URL(url).host.endsWith("netzo.io");
            const isApp = assertIsApp(origin!) || assertIsApp(referer!);

            ctx.state.access = { origin, referer, isApp };

            switch (level) {
              case "private": {
                if (!isApp) {
                  const {
                    NETZO_PROJECT_UID,
                    NETZO_APP_URL,
                  } = Deno.env.toObject();
                  const url = `${NETZO_APP_URL}/projects/${NETZO_PROJECT_UID}`;
                  return Response.redirect(url, 302);
                  // throw new Error(
                  //   "Private deployments cannot be accessed externally",
                  // );
                }
                return await ctx.next();
              }
              case "protected": {
                const {
                  username = Deno.env.get("BASIC_AUTH_USERNAME"),
                  password = Deno.env.get("BASIC_AUTH_PASSWORD"),
                  realm = Deno.env.get("BASIC_AUTH_REALM") ?? "Netzo App",
                } = options;
                if (!username || !password) {
                  throw new Error(
                    "BASIC_AUTH_USERNAME and BASIC_AUTH_PASSWORD must be set",
                  );
                }

                // NOTE: logout by navigating to another page to force browser to trigger
                // basic auth prompt again e.g. by navigating to http://log:out@localhost:8000/

                const credentials = `Basic ${btoa(`${username}:${password}`)}`;
                if (req.headers.get("Authorization") !== credentials) {
                  const headers = {
                    "WWW-Authenticate": `Basic realm="${realm}"`,
                  };
                  return new Response("Unauthorized", { status: 401, headers });
                }
                return await ctx.next();
              }
              case "public":
              default: {
                return await ctx.next();
              }
            }
          },
        },
      },
    ],
  };
};
