import type { Plugin } from "../../../deps/$fresh/server.ts";
import type { NetzoConfig } from "../../../framework/mod.ts";
import { enabled } from "../../../framework/plugins/mod.ts";
import { type AuthUser } from "../../../framework/plugins/auth/utils/db.ts";
import {
  ensureSignedIn,
  setAppState,
  setSessionState,
} from "./middlewares/mod.ts";
import { getRoutesByProvider } from "./routes/mod.ts";
import Auth from "./routes/auth.tsx";

export * from "../../../deps/deno_kv_oauth/mod.ts";

export type AuthState = {
  // session:
  sessionId?: string;
  sessionUser?: AuthUser;
  // app:
  origin?: string;
  referer?: string;
  isApp?: boolean;
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
  if (!enabled(options)) return { name: "auth" };

  const authRoutes = [
    { path: "/auth", component: Auth },
    ...Object.keys(options.providers)
      .filter((p) => options?.providers?.[p]?.enabled)
      .flatMap((p) => getRoutesByProvider(p, options?.providers?.[p])),
  ];

  return {
    name: "auth",
    middlewares: [
      {
        path: "/",
        middleware: { handler: setSessionState },
      },
      {
        path: "/",
        middleware: { handler: setAppState },
      },
      {
        path: "/",
        middleware: { handler: ensureSignedIn },
      },
    ],
    routes: authRoutes,
    islands: {
      baseLocation: import.meta.url,
      paths: [
        "./islands/auth-form.tsx",
      ],
    },
  };
};
