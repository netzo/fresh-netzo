import type { Plugin } from "$fresh/server.ts";
import type { OAuth2ClientConfig } from "deno_kv_oauth/mod.ts";
import { deepMerge } from "std/collections/deep_merge.ts";
import type { NetzoState } from "netzo/config/mod.ts";
import { type User } from "netzo/plugins/portals/utils/db.ts";
import { sessionMiddlewares } from "./session.ts";
import { errorHandlingMiddlewares } from "./error-handling.ts";
import { portalsRoutes } from "./portals.ts";

export * from "deno_kv_oauth/mod.ts";

const kv = await Deno.openKv();

export type PortalsOptions = {
  email: {}; // TODO: EmailClientConfig;
  oauth2: OAuth2ClientConfig;
  title?: string;
  description?: string;
  color?: string;
  backgroundColor?: string;
  logo?: string;
  caption?: {
    text: string;
    url: string;
  };
};

export type NetzoStatePortals =
  & Required<Pick<NetzoState, "portals">>
  & NetzoState;

export type PortalsState = {
  sessionId?: string;
  sessionUser?: User;
  options: PortalsOptions;
};

/**
 * A fresh plugin that registers middleware and handlers to
 * handle Authentication with multiple OAuth2 providers and
 * a configurable sign-in page.
 *
 * - `GET /auth` for the authentication page
 * - `GET /oauth/signin` for the sign-in page
 * - `GET /oauth/callback` for the callback page
 * - `GET /oauth/signout` for the sign-out page
 */
export const portals = (options: PortalsOptions): Plugin<NetzoStatePortals> => {
  return {
    name: "portals",
    middlewares: [
      {
        path: "/",
        middleware: {
          handler: async (_req, ctx) => {
            const { value: config } = await kv.get(["portals", "config"]);
            options = config ? deepMerge(options, config) : options;
            ctx.state.portals = { options };
            return await ctx.next();
          },
        },
      },
      ...sessionMiddlewares,
      ...errorHandlingMiddlewares,
    ],
    routes: [
      ...portalsRoutes(options),
    ],
  };
};
