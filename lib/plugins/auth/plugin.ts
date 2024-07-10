// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import type { App, FreshContext } from "fresh";
import type { NetzoState } from "../../mod.ts";
import {
  assertUserIsAuthorized,
  assertUserIsMemberOfWorkspaceOfApiKeyIfProviderIsNetzo,
  ensureSignedIn,
  NetzoStateWithAuth,
  setRequestState,
  setSessionState,
  setState,
} from "./middlewares/mod.ts";
import createRouteIndex from "./routes/auth.tsx";
import { EmailAuthConfig } from "./utils/providers/email.ts";
import { getAuthConfig, getFunctionsByProvider, getUserByProvider } from "./utils/providers/mod.ts";
import { NetzoAuthConfig } from "./utils/providers/netzo.ts";
import type { Auth, AuthProvider, AuthUser } from "./utils/types.ts";

export * from "../../deps/deno_kv_oauth/mod.ts";

export * from "./utils/adapter.ts";
export * from "./utils/schema.ts";

type AuthConfigProvider = {
  /** Whether to allow signups for new users (defaults to true). */
  allowNewUserRegistration?: boolean;
};

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
  image?: React.ImgHTMLAttributes<HTMLImageElement> & { src: string };
  /** The locale to use for the Toolbar plugin (defaults to "es"). */
  locale?: "en" | "es";
  /** The OAuth2 providers to enable for authentication. */
  providers: {
    email?: AuthConfigProvider & EmailAuthConfig;
    google?: AuthConfigProvider & {
      clientId?: string;
      clientSecret?: string;
    };
    github?: AuthConfigProvider & {
      clientId?: string;
      clientSecret?: string;
    };
    gitlab?: AuthConfigProvider & {
      clientId?: string;
      clientSecret?: string;
    };
    slack?: AuthConfigProvider & {
      clientId?: string;
      clientSecret?: string;
    };
    auth0?: AuthConfigProvider & {
      clientId?: string;
      clientSecret?: string;
      auth0Domain?: string; // must set AUTH0_DOMAIN environment variable
    };
    okta?: AuthConfigProvider & {
      clientId?: string;
      clientSecret?: string;
      oktaDomain?: string; // must set OKTA_DOMAIN environment variable
    };
    netzo?: AuthConfigProvider & NetzoAuthConfig;
    netzolabs?: AuthConfigProvider & {
      clientId?: string;
      clientSecret?: string;
    };
  };
  /** A function to check if a user is authorized to sign in. The function should
   * throw an Error with an optional error message if not authorized.
   * @example throw new Error("User is not authorized to sign in.");
   */
  assertAuthorization?: (
    user: AuthUser,
    ctx: FreshContext<NetzoStateWithAuth>,
  ) => Error | unknown;
  /** A function to resolve the user data from the user object. The function should
   * return an object with the user data. Note that the returned object will overwrite the
   * existing user.data object in the database, so be sure to merge new and existing data.
   * @example return { ...user.data, roles: user.email.endsWith("@example.com") ? ["admin"] : ["user"] }; */
  resolveUserData?: (
    user: AuthUser,
    ctx: FreshContext<NetzoStateWithAuth>,
  ) => AuthUser["data"];
  /* The Drizzle schema declaring the users and sessions tables.
  * For example: { adapter: createDatabaseAuth({ schema }) } */
  adapter: Auth;
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
 */
export const auth = (app: App<NetzoState>, config: AuthConfig) => {
  const authEnabled = [
    "email",
    "google",
    "github",
    "gitlab",
    "auth0",
    "okta",
    "netzo",
    "netzolabs",
  ].some((key) => !!config?.providers?.[key as AuthProvider]);
  if (!authEnabled) return; // skip if auth but no providers are set

  // defaults:

  config.logo ??= "";
  config.title ??= "Sign In";
  config.description ??= "Sign in to access the app";
  config.caption ??= ""; // e.g. 'By signing in you agree to the <a href="/" target="_blank">Terms of Service</a>';
  config.locale ??= "es";
  config.providers ??= {};
  config.assertAuthorization ??= () => true;
  config.resolveUserData ??= (user) => user?.data ?? {};

  // middlewares:

  app.use(setState(config));
  app.use(setSessionState(config));
  app.use(assertUserIsMemberOfWorkspaceOfApiKeyIfProviderIsNetzo(config));
  app.use(assertUserIsAuthorized(config));
  app.use(setRequestState(config));
  app.use(ensureSignedIn(config));

  // routes:

  app.all("/auth", (ctx) => ctx.render(createRouteIndex(config)(ctx)));
  Object.keys(config.providers).forEach((provider) => {
    const { locale = "es" } = config;
    const { allowNewUserRegistration = true } = config.providers?.[provider] ?? {};
    const [signIn, handleCallback, signOut] = getFunctionsByProvider(provider);

    // routes:

    app.all(`/auth/${provider}/signin`, async (ctx) => {
      const authConfig = getAuthConfig(provider, ctx);
      const response = await signIn(ctx.req, authConfig);
      return response;
    });
    app.all(`/auth/${provider}/callback`, async (ctx) => {
      const authConfig = getAuthConfig(provider, ctx);
      const { response, tokens, sessionId } = await handleCallback(ctx.req, authConfig);

      const userProvider = await getUserByProvider(provider, tokens.accessToken);
      let userCurrent = await ctx.state.auth.getUser(userProvider.authId);
      if (!userCurrent) {
        // IMPORTANT: authId can be provisionally hard-coded to the unique email of the user
        // when first being invited or when manually creating users in the database therefore
        // we also attempt to find the user by email if the above query by authId fails
        userCurrent = await ctx.state.auth.getInvitedUser(userProvider.authId);
      }

      // IMPORTANT: must explicitly set all properties to prevent "undefined" values
      const user = {
        id: userCurrent?.id,
        sessionId,
        provider: userProvider?.provider,
        authId: userProvider?.authId,
        name: userProvider?.name,
        email: userProvider?.email,
        avatar: userProvider?.avatar,
        data: config?.resolveUserData
          ? config?.resolveUserData?.(userCurrent ?? {}, ctx) ?? {}
          : userCurrent?.data ?? {}, // else keep existing data
        createdAt: userCurrent?.createdAt,
        updatedAt: userCurrent?.updatedAt,
        deletedAt: userCurrent?.deletedAt,
      } as unknown as AuthUser;

      // IMPORTANT: remove undefined values to prevent error "Unsupported type of value"
      // and let the database handle setting defaults (e.g. null or anything else)
      Object.keys(user).forEach((key) => {
        if (user[key] === undefined) delete user[key];
      });

      if (!userCurrent) {
        if (allowNewUserRegistration === true) {
          await ctx.state.auth.createUser(user);
          await ctx.state.auth.createUserSession(user, sessionId);
        } else {
          return new Response("", {
            status: 307,
            headers: { Location: `/auth?error=${i18n.newUserRegistrationNotAllowed}` },
          }); // redirect to relative path
        }
      } else {
        await ctx.state.auth.updateUser(user);
        await ctx.state.auth.updateUserSession(user, sessionId);
      }

      return response;
    });
    app.all(`/auth/signout`, async (ctx) => {
      const response = await signOut(ctx.req);
      return response;
    });
  });
};
