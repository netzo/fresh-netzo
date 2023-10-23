// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Plugin } from "$fresh/server.ts";
import { handleCallback, signIn, signOut } from "deno_kv_oauth/mod.ts";
import { AuthenticationOptions } from "netzo/authentication/plugin.ts";
import {
  createUser,
  getUser,
  updateUserSession,
  type User,
} from "../utils/db.ts";
import { getGitHubUser } from "../utils/github.ts";
import { handler } from "../routes/_middleware.ts";
import Auth from "../routes/auth.tsx";

// Exported for mocking and spying in e2e tests
export const _internals = { handleCallback };

/**
 * This custom plugin centralizes all authentication logic using the
 * {@link https://deno.land/x/deno_kv_oauth|Deno KV OAuth} module.
 */
export default (options: AuthenticationOptions): Plugin => {
  return {
    name: "kv-oauth",
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
              role: "admin",
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
  } as Plugin;
};
