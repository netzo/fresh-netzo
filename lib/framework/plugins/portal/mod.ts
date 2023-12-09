import type { Plugin } from "$fresh/src/server/mod.ts";
import type { OAuth2ClientConfig } from "deno_kv_oauth/mod.ts";
import { type User } from "netzo/framework/plugins/portal/utils/db.ts";
import { sessionMiddlewares } from "./session.ts";
import { errorHandlingMiddlewares } from "./error-handling.ts";
import { portalRoutes } from "./portal.ts";

export * from "deno_kv_oauth/mod.ts";

export type PortalOptions = {
  email: {}; // TODO: EmailClientConfig;
  oauth2: OAuth2ClientConfig;
  title?: string;
  description?: string;
  color?: string;
  backgroundColor?: string;
  logo?: string;
  caption?: string;
};

export type PortalState = {
  sessionId?: string;
  sessionUser?: User;
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
export const portal = (options: PortalOptions): Plugin => {
  return {
    name: "portal",
    middlewares: [
      ...sessionMiddlewares,
      ...errorHandlingMiddlewares,
    ],
    routes: [
      ...portalRoutes(options),
    ],
    islands: {
      baseLocation: import.meta.url,
      paths: [
        "./islands/auth-form.tsx",
      ],
    },
  };
};
