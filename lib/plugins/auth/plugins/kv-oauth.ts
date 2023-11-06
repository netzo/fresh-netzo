import type { Plugin } from "$fresh/server.ts";
import { handleCallback, signIn, signOut } from "deno_kv_oauth/mod.ts";
import {
  createUser,
  getUser,
  updateUserSession,
  type User,
} from "../utils/db.ts";
import { getGitHubUser } from "../utils/providers/github.ts";
import Auth from "../routes/auth.tsx";
import type { AuthOptions } from "../mod.ts";

// Exported for mocking and spying in e2e tests
export const _internals = { handleCallback };

/**
 * This custom plugin centralizes all authentication logic using the
 * {@link https://deno.land/x/deno_kv_oauth|Deno KV OAuth} module.
 */
export const kvOAuth = (options: AuthOptions): Plugin => {
  return {
    name: "kv-oauth",
    routes: [
      {
        path: "/auth",
        handler: (_req, ctx) => {
          return ctx.render();
        },
        component: Auth,
      },
      {
        path: `/oauth/signin`,
        handler: async (req, _ctx) => {
          const response = await signIn(req, options.oauth2);
          console.debug(`/oauth/signin`, response);
          return response;
        },
      },
      {
        path: `/oauth/callback`,
        handler: async (req, _ctx) => {
          const { response, tokens, sessionId } = await handleCallback(
            req,
            options.oauth2,
          );
          console.debug(`/oauth/callback`, response);
          const githubUser = await getGitHubUser(tokens.accessToken);
          const user = await getUser(githubUser.login);

          if (user === null) {
            const user = {
              login: githubUser.login,
              sessionId,
              name: githubUser.name,
              email: githubUser.email,
              role: "admin",
            } as User;
            await createUser(user);
          } else {
            await updateUserSession(user, sessionId);
          }

          return response;
        },
      },
      {
        path: `/oauth/signout`,
        handler: async (req, _ctx) => {
          const response = await signOut(req);
          console.debug(`/oauth/signout`, response);
          return response;
        },
      },
    ],
  } as Plugin;
};
