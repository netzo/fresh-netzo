import type { Plugin } from "../../../deps/$fresh/src/server/mod.ts";
import type { OAuth2ClientConfig } from "../../../deps/deno_kv_oauth/mod.ts";
import { type User } from "../../../framework/plugins/auth/utils/db.ts";
import { internalMiddlewares } from "./internal.ts";
import { sessionMiddlewares } from "./session.ts";
import { errorHandlingMiddlewares } from "./error-handling.ts";
import { authRoutes } from "./auth.ts";

export * from "../../../deps/deno_kv_oauth/mod.ts";

export type AuthOptions = {
  email: {}; // TODO: EmailClientConfig;
  oauth2: OAuth2ClientConfig;
  title?: string;
  description?: string;
  color?: string;
  backgroundColor?: string;
  logo?: string;
  caption?: string;
};

export type AuthState = {
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
export const auth = (options: AuthOptions): Plugin => {
  return {
    name: "auth",
    middlewares: [
      ...internalMiddlewares,
      ...sessionMiddlewares,
      ...errorHandlingMiddlewares,
    ],
    routes: [
      ...authRoutes(options),
    ],
    islands: {
      baseLocation: import.meta.url,
      paths: [
        "./islands/auth-form.tsx",
      ],
    },
  };
};
