import { Plugin } from "$fresh/server.ts";
import type { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getSessionId } from "deno_kv_oauth/mod.ts";
import { getUserBySession } from "netzo/plugins/auth/utils/db.ts";
import { createHttpError } from "std/http/http_errors.ts";
import { Status } from "std/http/http_status.ts";
import { AuthState } from "../mod.ts";

export function assertSignedIn(state: AuthState) {
  if (state.auth.sessionUser === undefined) {
    throw createHttpError(Status.Unauthorized, "User must be signed in");
  }
}

async function setSessionState(
  req: Request,
  ctx: MiddlewareHandlerContext<AuthState>,
) {
  if (!["route"].includes(ctx.destination)) return await ctx.next();

  const sessionId = await getSessionId(req);
  ctx.state.auth.sessionId = sessionId;
  ctx.state.auth.sessionUser = undefined; // reset each request (before next())

  if (sessionId === undefined) return await ctx.next();
  const user = await getUserBySession(sessionId);
  if (!user) return await ctx.next();

  ctx.state.auth.sessionUser = user;

  return await ctx.next();
}

// async function ensureSignedIn(
//   _req: Request,
//   ctx: MiddlewareHandlerContext<AuthState>,
// ) {
//   assertSignedIn(ctx.state);
//   return await ctx.next();
// }

export async function ensureSignedIn(
  req: Request,
  ctx: MiddlewareHandlerContext<AuthState>,
) {
  const url = new URL(req.url);
  if (!["route"].includes(ctx.destination)) return await ctx.next();

  if (url.pathname.startsWith("/oauth/")) return await ctx.next();

  // check auth state
  const { sessionId } = ctx.state.auth;
  const isAuthenticated = sessionId !== undefined;

  console.log({ isAuthenticated, sessionId });

  // redirect to /auth if not authenticated or to / if authenticated
  if (url.pathname !== "/auth" && !isAuthenticated) {
    console.debug("[auth] User logged out, redirecting to /auth");
    url.pathname = "/auth";
    return Response.redirect(url.href, 302);
  } else if (url.pathname === "/auth" && isAuthenticated) {
    console.debug("[auth] User logged in, redirecting to /");
    url.pathname = "/";
    return Response.redirect(url.href, 302);
  }

  return await ctx.next();
}

/**
 * Adds middleware to the defined routes that ensures the client is signed-in
 * before proceeding. The {@linkcode ensureSignedIn} middleware throws an error
 * equivalent to the
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401|HTTP 401 Unauthorized}
 * error if `ctx.state.auth.sessionUser` is `undefined`.
 *
 * The thrown error is then handled by {@linkcode handleWebPageErrors}, or
 * {@linkcode handleRestApiErrors}, if the request is made to a REST API
 * endpoint.
 *
 * @see {@link https://fresh.deno.dev/docs/concepts/plugins|Plugins documentation}
 * for more information on Fresh's plugin functionality.
 */
export const session = (): Plugin => {
  return {
    name: "session",
    middlewares: [
      {
        path: "/",
        middleware: { handler: setSessionState },
      },
      {
        path: "/",
        middleware: { handler: ensureSignedIn },
      },
    ],
  } as Plugin<AuthState>;
};
