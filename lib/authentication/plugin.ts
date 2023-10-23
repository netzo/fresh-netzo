import type { Plugin } from "$fresh/server.ts";
import type { PluginRoute } from "$fresh/src/server/types.ts";
import {
  handleCallback,
  type OAuth2ClientConfig,
  signIn,
  signOut,
} from "deno_kv_oauth/mod.ts";
import Auth from "./routes/auth.tsx";
import { handler } from "./routes/_middleware.ts";
import { getGitHubUser } from "netzo/authentication/utils/github.ts";
import {
  createUser,
  getUser,
  updateUserSession,
  User,
} from "netzo/authentication/utils/db.ts";

export type AuthenticationOptions = {
  // email: EmailClientConfig;
  oauth2: OAuth2ClientConfig;
};

/**
 * A fresh plugin that registers middleware and handlers to
 * handle Authentication with multiple OAuth2 providers and
 * a configurable sign-in page.
 *
 * - `GET /auth` for the authentication page
 * - `GET /auth/signin` for the sign-in page
 * - `GET /auth/callback` for the callback page
 * - `GET /auth/signout` for the sign-out page
 */
export const authenticationPlugin = (
  options: AuthenticationOptions,
): Plugin => {
  return {
    name: "authentication-plugin",
    middlewares: [
      { path: "/", middleware: { handler } },
    ],
    routes: [
      {
        path: "/auth",
        handler: (_req, ctx) => {
          return ctx.render();
        },
        component: Auth,
      },
      {
        path: `/auth/signin`,
        handler: async (req, _ctx) => {
          const response = await signIn(req, options?.oauth2);
          console.debug(`/auth/signin`, response);
          return response;
        },
      },
      {
        path: `/auth/callback`,
        handler: async (req, _ctx) => {
          // Return object also includes `tokens` and `sessionId` properties.
          const { response, tokens, sessionId } = await handleCallback(
            req,
            options?.oauth2,
          );
          console.debug(`/auth/callback`, response);
          const githubUser = await getGitHubUser(tokens.accessToken);
          const user = await getUser(githubUser.login);

          if (user === null) {
            const user: User = {
              login: githubUser.login,
              sessionId,
              isSubscribed: false,
            };
            await createUser(user);
          } else {
            await updateUserSession(user, sessionId);
          }

          return response;
        },
      },
      {
        path: `/auth/signout`,
        handler: async (req, _ctx) => {
          const response = await signOut(req);
          console.debug(`/auth/signout`, response);
          return response;
        },
      },
    ],
  };
};
