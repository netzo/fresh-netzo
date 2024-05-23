import type { FreshContext, Plugin, PluginRoute } from "$fresh/server.ts";
import { DrizzleConfig } from "npm:drizzle-orm@0.30.10/utils";
import { HTMLAttributes } from "preact/compat";
import type { NetzoState } from "../../mod.ts";
import {
  assertUserIsMemberOfWorkspaceOfApiKeyIfProviderIsNetzo,
  createAssertUserIsAuthorized,
  createSetAuthState,
  ensureSignedIn,
  NetzoStateWithAuth,
  setRequestState,
  setSessionState,
} from "./middlewares/mod.ts";
import createAuth from "./routes/auth.tsx";
import { getRoutesByProvider } from "./routes/mod.ts";
import type { EmailAuthConfig } from "./utils/providers/email.ts";
import type { NetzoAuthConfig } from "./utils/providers/netzo.ts";
import type { Auth, AuthProvider, AuthUser } from "./utils/types.ts";

export * from "../../deps/deno_kv_oauth/mod.ts";

export type AuthConfig = {
  /** An image URL for the logo to appear above the login form at /auth. */
  logo?: string;
  /** A short title for the app to appear above the login form at /auth. */
  title?: string;
  /** A short description for the app to appear above the login form at /auth. */
  description?: string;
  /** HTML content rendered below auth form e.g. to display a link to the terms of service via an a tag. */
  caption?: string;
  /** An image URL to display to the right side of the login form at /auth. */
  image?: HTMLAttributes<HTMLImageElement>;
  locale?: "en" | "es";
  providers: {
    netzo?: NetzoAuthConfig;
    email?: EmailAuthConfig;
    google?: {
      clientId?: string;
      clientSecret?: string;
    };
    github?: {
      clientId?: string;
      clientSecret?: string;
    };
    gitlab?: {
      clientId?: string;
      clientSecret?: string;
    };
    slack?: {
      clientId?: string;
      clientSecret?: string;
    };
    auth0?: {
      clientId?: string;
      clientSecret?: string;
      auth0Domain?: string; // must set AUTH0_DOMAIN environment variable
    };
    okta?: {
      clientId?: string;
      clientSecret?: string;
      oktaDomain?: string; // must set OKTA_DOMAIN environment variable
    };
  };
  /** A function to check if a user is authorized to sign in. The function should
   * throw an Error with an optional error message if not authorized.
   * @example throw new Error("User is not authorized to sign in.");
   */
  assertAuthorization?: (
    user: AuthUser,
    req: Request,
    ctx: FreshContext<NetzoStateWithAuth>,
  ) => Error | unknown;
  /* The Drizzle schema declaring the users and sessions tables. */
  schema: DrizzleConfig["schema"];
};

export type AuthState = Auth & {
  /* Session ID used internally by the auth plugin. */
  sessionId?: string;
  /* The user object associated with the session ID. */
  sessionUser?: AuthUser;
  /* Whether the user is authenticated (if sessionId not expired and sessionUser defined). */
  isAuthenticated?: boolean;
  /* The origin of the request (e.g. https://my-project-906698.netzo.io). */
  origin?: string;
  /* The referer of the request (e.g. https://app.netzo.io/some-path). */
  referer?: string;
  /* Wether the request is coming from the Netzo app (e.g. app.netzo.io). */
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
 *
 * @param {AuthConfig} - configuration options for the plugin
 * @returns {Plugin} - a Plugin for Deno Fresh
 */
export const auth = (config: AuthConfig): Plugin<NetzoState> => {
  const authEnabled = [
    "netzo",
    "email",
    "google",
    "github",
    "gitlab",
    "auth0",
    "okta",
  ].some((key) => !!config?.providers?.[key as AuthProvider]);
  if (!authEnabled) return { name: "netzo.auth" }; // skip if auth but no providers are set

  config.logo ??= "";
  config.title ??= "Sign In";
  config.description ??= "Sign in to access the app";
  config.caption ??= ""; // e.g. 'By signing in you agree to the <a href="/" target="_blank">Terms of Service</a>';
  config.providers ??= {};
  config.assertAuthorization ??= () => true;

  const authRoutes: PluginRoute[] = [
    { path: "/auth", component: createAuth(config) },
    ...Object.keys(config.providers)
      .filter((provider) => !!config?.providers?.[provider as AuthProvider])
      .flatMap((provider) =>
        getRoutesByProvider(provider as AuthProvider, config)
      ),
  ];

  return {
    name: "netzo.auth",
    middlewares: [
      {
        path: "/",
        middleware: { handler: createSetAuthState(config) },
      },
      {
        path: "/",
        middleware: { handler: setSessionState },
      },
      {
        path: "/",
        middleware: {
          handler: assertUserIsMemberOfWorkspaceOfApiKeyIfProviderIsNetzo,
        },
      },
      {
        path: "/",
        middleware: { handler: createAssertUserIsAuthorized(config) },
      },
      {
        path: "/",
        middleware: { handler: setRequestState },
      },
      {
        path: "/",
        middleware: { handler: ensureSignedIn },
      },
    ],
    routes: authRoutes,
  };
};
