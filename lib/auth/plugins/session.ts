import { Plugin } from "$fresh/server.ts";
import type { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getSessionId } from "deno_kv_oauth/mod.ts";
import { getUserBySession } from "netzo/auth/utils/db.ts";
import type { User } from "netzo/auth/utils/db.ts";
import { createHttpError } from "std/http/http_errors.ts";
import { Status } from "std/http/http_status.ts";
import { AuthOptions } from "netzo/auth/plugin.ts";

export interface State {
  sessionUser?: User;
}

export type SignedInState = Required<State>;

export function assertSignedIn(
  ctx: { state: State },
): asserts ctx is { state: SignedInState } {
  if (ctx.state.sessionUser === undefined) {
    throw createHttpError(Status.Unauthorized, "User must be signed in");
  }
}

async function setSessionState(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  if (ctx.destination !== "route") return await ctx.next();

  // Initial state
  ctx.state.sessionUser = undefined;

  const sessionId = getSessionId(req);
  if (sessionId === undefined) return await ctx.next();
  const user = await getUserBySession(sessionId);
  if (user === null) return await ctx.next();

  ctx.state.sessionUser = user;

  return await ctx.next();
}

async function ensureSignedIn(
  _req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  assertSignedIn(ctx);
  return await ctx.next();
}

/**
 * Adds middleware to the defined routes that ensures the client is signed-in
 * before proceeding. The {@linkcode ensureSignedIn} middleware throws an error
 * equivalent to the
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401|HTTP 401 Unauthorized}
 * error if `ctx.state.sessionUser` is `undefined`.
 *
 * The thrown error is then handled by {@linkcode handleWebPageErrors}, or
 * {@linkcode handleRestApiErrors}, if the request is made to a REST API
 * endpoint.
 *
 * @see {@link https://fresh.deno.dev/docs/concepts/plugins|Plugins documentation}
 * for more information on Fresh's plugin functionality.
 */
export default (_options: AuthOptions): Plugin => {
  return {
    name: "session",
    middlewares: [
      {
        path: "/",
        middleware: { handler: setSessionState },
      },
      {
        path: "/account",
        middleware: { handler: ensureSignedIn },
      },
      {
        path: "/dashboard",
        middleware: { handler: ensureSignedIn },
      },
      {
        path: "/api/me",
        middleware: { handler: ensureSignedIn },
      },
    ],
  } as Plugin<State>;
};
