import type { Plugin } from "../../../deps/$fresh/server.ts";
import type { NetzoConfig } from "../../../framework/mod.ts";
import { type User } from "../../../framework/plugins/auth/utils/db.ts";
import { internalMiddlewares } from "./middlewares/internal.ts";
import { externalMiddlewares } from "./middlewares/external.ts";
import Auth from "./routes/external/auth.tsx";
import { getRoutesByProvider } from "./routes/external/[provider].ts";

export * from "../../../deps/deno_kv_oauth/mod.ts";

export type AuthState = {
  // internal:
  origin?: string;
  referer?: string;
  isApp?: boolean;
  // external:
  sessionId?: string;
  sessionUser?: User;
};

/**
 * A fresh plugin that registers middleware and handlers to
 * handle Authentication with multiple OAuth2 providers and
 * a configurable sign-in page.
 *
 * - `GET /auth` for the authentication page
 * - `GET /auth/{provider}/signin` for the sign-in page
 * - `GET /auth/{provider}/callback` for the callback page
 * - `GET /auth/signout` for the sign-out page
 */
export const auth = (options: NetzoConfig["auth"]): Plugin => {
  if (options?.enabled) {
    // internal authentication via netzo (redirects all external requests to app)
    if (["internal"].includes(options?.level)) {
      return {
        name: "auth",
        middlewares: internalMiddlewares,
      };
    } // external authentication via email or oauth2 providers
    else if (["external"].includes(options?.level)) {
      const externalRoutes = [
        { path: "/auth", component: Auth },
        ...Object.keys(options.providers)
          .filter((p) => options?.providers?.[p]?.enabled)
          .flatMap((p) => getRoutesByProvider(p, options?.providers?.[p])),
      ];
      return {
        name: "auth",
        middlewares: externalMiddlewares,
        routes: externalRoutes,
        islands: {
          baseLocation: import.meta.url,
          paths: [
            "./islands/auth-form.tsx",
          ],
        },
      };
    }
  }

  return { name: "auth" };
};
