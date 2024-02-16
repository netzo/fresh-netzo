import type { Plugin, RouteContext } from "../../deps/$fresh/server.ts";
import type { OAuth2ClientConfig } from "../../deps/oauth2_client/src/oauth2_client.ts";
import type { NetzoState } from "../../mod.ts";
import type { AuthUser } from "./utils/db.ts";
import {
  ensureSignedIn,
  setAppState,
  setSessionState,
} from "./middlewares/mod.ts";
import { getRoutesByProvider } from "./routes/mod.ts";
import Auth from "./routes/auth.tsx";
import type { AuthProvider } from "./utils/providers/mod.ts";
import type { NetzoClientConfig } from "./utils/providers/netzo.ts";
import type { EmailClientConfig } from "./utils/providers/email.ts";

export * from "../../deps/deno_kv_oauth/mod.ts";

export type AuthConfig = {
  /** A short title for the app to appear above the login form at /auth. */
  title?: string;
  /** A short description for the app to appear above the login form at /auth. */
  description?: string;
  /** HTML content rendered below auth form e.g. to display a link to the terms of service via an a tag. */
  caption?: string;
  providers: {
    netzo?: NetzoClientConfig;
    email?: EmailClientConfig;
    google?: OAuth2ClientConfig;
    github?: OAuth2ClientConfig;
    gitlab?: OAuth2ClientConfig;
    slack?: OAuth2ClientConfig;
    auth0?: OAuth2ClientConfig;
    okta?: OAuth2ClientConfig;
  };
};

export type AuthState = {
  // session:
  sessionId?: string;
  sessionUser?: AuthUser;
  // app:
  origin?: string;
  referer?: string;
  isApp?: boolean;
};

export function useAuth(ctx: RouteContext<void, NetzoState>) {
  const config = ctx.state?.config?.auth;
  const state = ctx.state?.auth ?? {};
  const { sessionId, sessionUser } = state;

  const mustAuth = !!config && !sessionId;

  return { config, state, sessionId, sessionUser, mustAuth };
}

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
export const auth = (options?: AuthConfig): Plugin => {
  if (!options) return { name: "auth" };

  const authEnabled = [
    "netzo",
    "email",
    "google",
    "github",
    "gitlab",
    "auth0",
    "okta",
  ].some((key) => !!options?.providers?.[key as AuthProvider]);
  if (!authEnabled) return { name: "auth" }; // skip if auth but no providers are set

  options.title ??= "Sign In";
  options.description ??= "Sign in to access the app";
  options.caption ??= ""; // e.g. 'By signing in you agree to the <a href="/" target="_blank">Terms of Service</a>';
  options.providers ??= {};

  const authRoutes = [
    { path: "/auth", component: Auth },
    ...Object.keys(options.providers)
      .filter((provider) => !!options?.providers?.[provider as AuthProvider])
      .flatMap((provider) =>
        getRoutesByProvider(provider as AuthProvider, options)
      ),
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
