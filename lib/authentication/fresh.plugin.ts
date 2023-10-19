// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { MiddlewareHandlerContext, Plugin } from "$fresh/server.ts";
import type { OAuth2ClientConfig } from "deno_kv_oauth/deps.ts";
import { signIn } from "deno_kv_oauth/lib/sign_in.ts";
import { handleCallback } from "deno_kv_oauth/lib/handle_callback.ts";
import { signOut } from "deno_kv_oauth/lib/sign_out.ts";
import { getSessionId } from "deno_kv_oauth/lib/get_session_id.ts";

export interface NetzoAuthPluginOptions {
  /**
   * Sign-in page path
   *
   * @default {"/oauth/signin"}
   */
  signInPath?: string;
  /**
   * Callback page path
   *
   * @default {"/oauth/callback"}
   */
  callbackPath?: string;
  /**
   * Sign-out page path
   *
   * @default {"/oauth/signout"}
   */
  signOutPath?: string;
}

export interface AuthState {
  sessionId: string;
  isAuthenticated: boolean;
}

/**
 * Creates a basic plugin for the [Fresh]{@link https://fresh.deno.dev/} web framework.
 *
 * This creates handlers for the following routes:
 * - `GET /oauth/signin` for the sign-in page
 * - `GET /oauth/callback` for the callback page
 * - `GET /oauth/signout` for the sign-out page
 *
 * ```ts
 * // main.ts
 * import { start } from "$fresh/server.ts";
 * import { createGitHubOAuthConfig, netzoAuthPlugin } from "https://deno.land/x/netzo@$VERSION/authentication/mod.ts";
 * import manifest from "./fresh.gen.ts";
 *
 * await start(manifest, {
 *   plugins: [
 *     netzoAuthPlugin(createGitHubOAuthConfig())
 *   ]
 * });
 * ```
 */
export function netzoAuthPlugin(
  oauthConfig: OAuth2ClientConfig,
  options?: NetzoAuthPluginOptions,
): Plugin {
  return {
    name: "kv-oauth",
    middlewares: [
      {
        path: "/",
        middleware: {
          handler: async (
            request: Request,
            ctx: MiddlewareHandlerContext<AuthState>,
          ) => {
            const url = new URL(request.url);
            const skipDestination = !["route"].includes(ctx.destination);
            const skipRoute = url.pathname.startsWith("/oauth");
            if (skipDestination || skipRoute) return await ctx.next();

            // check auth state
            const sessionId = getSessionId(request) as string | undefined;
            const isAuthenticated = sessionId !== undefined;

            // redirect to /auth if not authenticated or to / if authenticated
            if (!isAuthenticated && !["/auth"].includes(url.pathname)) {
              // console.debug("[auth] User logged out, redirecting to /auth");
              url.pathname = "/auth";
              return Response.redirect(url.href, 302);
            } else if (isAuthenticated && ["/auth"].includes(url.pathname)) {
              // console.debug("[auth] User logged in, redirecting to /");
              url.pathname = "/";
              return Response.redirect(url.href, 302);
            }

            // pass auth state to routes/middleware
            ctx.state = { sessionId, isAuthenticated } as AuthState;
            const response = await ctx.next();
            return response;
          },
        },
      },
    ],
    routes: [
      {
        path: options?.signInPath ?? "/oauth/signin",
        handler: async (req) => {
          const response = await signIn(req, oauthConfig);
          console.log("/oauth/signin", response);
          return response;
        },
      },
      {
        path: options?.callbackPath ?? "/oauth/callback",
        handler: async (req) => {
          // Return object also includes `tokens` and `sessionId` properties.
          const { response, tokens, sessionId } = await handleCallback(
            req,
            oauthConfig,
          );
          console.log("/oauth/callback", response);
          return response;
        },
      },
      {
        path: options?.signOutPath ?? "/oauth/signout",
        handler: async (req) => {
          const response = await signOut(req, oauthConfig);
          console.log("/oauth/signout", response);
          return response;
        },
      },
    ],
  };
}
