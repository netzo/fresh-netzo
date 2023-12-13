import type { FreshContext } from "../../../../deps/$fresh/server.ts";
import type { PluginMiddleware } from "../../../../deps/$fresh/server.ts";
import { getSessionId } from "../../../../deps/deno_kv_oauth/mod.ts";
import { getUserBySession } from "../../../../framework/plugins/auth/utils/db.ts";
import type { NetzoState } from "../../../../framework/mod.ts";

async function setSessionState(
  req: Request,
  ctx: FreshContext<NetzoState>,
) {
  if (!["route"].includes(ctx.destination)) return await ctx.next();

  const sessionId = await getSessionId(req);
  ctx.state.auth = {
    ...ctx.state.auth,
    sessionId,
    sessionUser: undefined, // reset each request (before next())
  };

  if (sessionId === undefined) return await ctx.next();
  const user = await getUserBySession(sessionId);
  if (!user) return await ctx.next();

  ctx.state.auth.sessionUser = user;

  return await ctx.next();
}

export async function ensureSignedIn(
  req: Request,
  ctx: FreshContext<NetzoState>,
) {
  const url = new URL(req.url);
  if (!["route"].includes(ctx.destination)) return await ctx.next();

  // IMPORTANT: disable client-side navigation for around logout links to
  // skip partials which cause infinite redirects in auth/external middleware

  // skip authentication routes (signin, callback, signout)
  if (url.pathname.startsWith("/auth/")) return await ctx.next();

  // check auth state
  const sessionId = ctx.state.auth?.sessionId;
  const isAuthenticated = sessionId !== undefined;

  // redirect to /auth if not authenticated or to / if authenticated
  if (url.pathname !== "/auth" && !isAuthenticated) {
    // console.debug("[auth] User logged out, redirecting to /auth");
    url.pathname = "/auth";
    return Response.redirect(url.href, 302);
  } else if (url.pathname === "/auth" && isAuthenticated) {
    // console.debug("[auth] User logged in, redirecting to /");
    url.pathname = "/";
    return Response.redirect(url.href, 302);
  }

  return await ctx.next();
}

/**
 * Middleware that ensures the client is signed-in before proceeding.
 */
export const externalMiddlewares: PluginMiddleware<NetzoState>[] = [
  {
    path: "/",
    middleware: { handler: setSessionState },
  },
  {
    path: "/",
    middleware: { handler: ensureSignedIn },
  },
];
