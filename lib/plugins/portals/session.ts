import type { FreshContext } from "$fresh/src/server/mod.ts";
import type { PluginMiddleware } from "$fresh/src/server/types.ts";
import { getSessionId } from "deno_kv_oauth/mod.ts";
import { getUserBySession } from "netzo/plugins/portals/utils/db.ts";
import { createHttpError } from "std/http/http_errors.ts";
import { Status } from "std/http/http_status.ts";
import type { NetzoStatePortals } from "./mod.ts";

export function assertSignedIn(state: NetzoStatePortals) {
  if (state.portals?.sessionUser === undefined) {
    throw createHttpError(Status.Unauthorized, "User must be signed in");
  }
}

async function setSessionState(
  req: Request,
  ctx: FreshContext<NetzoStatePortals>,
) {
  if (!["route"].includes(ctx.destination)) return await ctx.next();

  const sessionId = await getSessionId(req);
  ctx.state.portals = {
    ...ctx.state.portals,
    sessionId,
    sessionUser: undefined, // reset each request (before next())
  };

  if (sessionId === undefined) return await ctx.next();
  const user = await getUserBySession(sessionId);
  if (!user) return await ctx.next();

  ctx.state.portals.sessionUser = user;

  return await ctx.next();
}

// async function ensureSignedIn(
//   _req: Request,
//   ctx: FreshContext<NetzoStatePortals>,
// ) {
//   assertSignedIn(ctx.state);
//   return await ctx.next();
// }

export async function ensureSignedIn(
  req: Request,
  ctx: FreshContext<NetzoStatePortals>,
) {
  const url = new URL(req.url);
  if (!["route"].includes(ctx.destination)) return await ctx.next();

  if (url.pathname.startsWith("/oauth/")) return await ctx.next();

  // check portals state
  const { sessionId } = ctx.state.portals;
  const isAuthenticated = sessionId !== undefined;

  // redirect to /auth if not authenticated or to / if authenticated
  if (url.pathname !== "/auth" && !isAuthenticated) {
    console.debug("[portals] User logged out, redirecting to /auth");
    url.pathname = "/auth";
    return Response.redirect(url.href, 302);
  } else if (url.pathname === "/auth" && isAuthenticated) {
    console.debug("[portals] User logged in, redirecting to /");
    url.pathname = "/";
    return Response.redirect(url.href, 302);
  }

  return await ctx.next();
}

/**
 * Middleware that ensures the client is signed-in before proceeding.
 * The {@linkcode ensureSignedIn} middleware throws an error equivalent to the
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401|HTTP 401 Unauthorized}
 * error if `ctx.state.portals.sessionUser` is `undefined`.
 *
 * The thrown error is then handled by {@linkcode handleWebPageErrors}, or
 * {@linkcode handleRestApiErrors}, if the request is made to a REST API endpoint.
 *
 * @see {@link https://fresh.deno.dev/docs/concepts/plugins|Plugins documentation}
 * for more information on Fresh's plugin functionality.
 */
export const sessionMiddlewares: PluginMiddleware<NetzoStatePortals>[] = [
  {
    path: "/",
    middleware: { handler: setSessionState },
  },
  {
    path: "/",
    middleware: { handler: ensureSignedIn },
  },
];
