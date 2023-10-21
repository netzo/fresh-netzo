import type { MiddlewareHandlerContext, Plugin } from "$fresh/server.ts";
import type { OAuth2ClientConfig } from "https://deno.land/x/deno_kv_oauth@v0.9.1/deps.ts";
import { signIn } from "https://deno.land/x/deno_kv_oauth@v0.9.1/lib/sign_in.ts";
import { handleCallback } from "https://deno.land/x/deno_kv_oauth@v0.9.1/lib/handle_callback.ts";
import { signOut } from "https://deno.land/x/deno_kv_oauth@v0.9.1/lib/sign_out.ts";
import { getSessionId } from "https://deno.land/x/deno_kv_oauth@v0.9.1/lib/get_session_id.ts";
import Auth from "./auth.tsx";

export type AuthenticationOptions = {
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
  /**
   * OAuth2 client configuration
   */
  providers: {
    custom?: OAuth2ClientConfig;
    google?: OAuth2ClientConfig;
    azure?: OAuth2ClientConfig;
    github?: OAuth2ClientConfig;
    gitlab?: OAuth2ClientConfig;
    auth0?: OAuth2ClientConfig;
    okta?: OAuth2ClientConfig;
  }
}

export interface AuthenticationState {
  options: AuthenticationOptions;
  sessionId: string;
  isAuthenticated: boolean;
}

/**
 * A plugin for the [Fresh]{@link https://fresh.deno.dev/} web framework.
 *
 * This creates handlers for the following routes:
 * - `GET /oauth/signin` for the sign-in page
 * - `GET /oauth/callback` for the callback page
 * - `GET /oauth/signout` for the sign-out page
 * - `GET /auth` for the authentication page
 */
export const authenticationPlugin = (
  options: AuthenticationOptions,
): Plugin => {
  return {
    name: "kv-oauth",
    middlewares: [
      {
        path: "/",
        middleware: {
          handler: async (
            request: Request,
            ctx: MiddlewareHandlerContext<AuthenticationState>,
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
            ctx.state = {
              options,
              sessionId: sessionId as string,
              isAuthenticated,
            };
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
          const response = await signIn(req, options);
          // console.debug("/oauth/signin", response);
          return response;
        },
      },
      {
        path: options?.callbackPath ?? "/oauth/callback",
        handler: async (req) => {
          // Return object also includes `tokens` and `sessionId` properties.
          const { response, tokens, sessionId } = await handleCallback(
            req,
            options,
          );
          // console.debug("/oauth/callback", response);
          return response;
        },
      },
      {
        path: options?.signOutPath ?? "/oauth/signout",
        handler: async (req) => {
          const response = await signOut(req, options);
          // console.debug("/oauth/signout", response);
          return response;
        },
      },
      {
        path: "/auth",
        component: Auth,
      },
    ],
  };
};
