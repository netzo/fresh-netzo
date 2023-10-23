// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Plugin } from "$fresh/server.ts";
import {
  createGitHubOAuthConfig,
  handleCallback,
  signIn,
  signOut,
} from "deno_kv_oauth/mod.ts";
import {
  createUser,
  getUser,
  updateUserSession,
  type User,
} from "netzo/authentication/utils/db.ts";
import { getGitHubUser } from "netzo/authentication/utils/github.ts";

// Exported for mocking and spying in e2e tests
export const _internals = { handleCallback };

/**
 * This custom plugin centralizes all authentication logic using the
 * {@link https://deno.land/x/deno_kv_oauth|Deno KV OAuth} module.
 *
 * The implementation is based off Deno KV OAuth's own
 * {@link https://deno.land/x/deno_kv_oauth/src/fresh_plugin.ts?source|Fresh plugin}
 * implementation.
 */
export default {
  name: "kv-oauth",
  routes: [
    {
      path: "/auth/signin",
      handler: async (req) => await signIn(req, createGitHubOAuthConfig()),
    },
    {
      path: "/auth/callback",
      handler: async (req) => {
        const { response, tokens, sessionId } = await _internals.handleCallback(
          req,
          createGitHubOAuthConfig(),
        );

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
      path: "/auth/signout",
      handler: signOut,
    },
  ],
} as Plugin;
