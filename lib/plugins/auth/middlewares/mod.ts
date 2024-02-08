import type { FreshContext } from "../../../deps/$fresh/server.ts";
import { getSessionId } from "../../../deps/deno_kv_oauth/mod.ts";
import { getUserBySession } from "../utils/db.ts";
import type { NetzoState } from "../../mod.ts";

const skip = (_req: Request, ctx: FreshContext<NetzoState>) => {
  if (!["route"].includes(ctx.destination)) return true;
  if (ctx.url.pathname.startsWith("/auth/")) return true; // skip auth routes (signin, callback, signout)
  if (ctx.url.pathname.startsWith("/db")) return true; // skip database API routes
  if (ctx.url.pathname.startsWith("/api")) return true; // skip user API routes
  return false;
};

export async function setSessionState(
  req: Request,
  ctx: FreshContext<NetzoState>,
) {
  if (skip(req, ctx)) return await ctx.next();

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

export async function setAppState(
  req: Request,
  ctx: FreshContext<NetzoState>,
) {
  if (skip(req, ctx)) return await ctx.next();

  // const host = req.headers.get("host"); // e.g. my-project-906698.netzo.io
  const origin = req.headers.get("origin")!; // e.g. https://my-project-906698.netzo.io
  const referer = req.headers.get("referer")!; // SOMETIMES SET e.g. https://app.netzo.io/some-path

  // simple heuristics to determine source of request:
  const assertIsApp = (url: string) =>
    !!url && new URL(url).host.endsWith("netzo.io");
  const isApp = assertIsApp(origin!) || assertIsApp(referer!);

  ctx.state.auth = { ...ctx.state.auth, origin, referer, isApp };

  return await ctx.next();
}

export async function ensureSignedIn(
  req: Request,
  ctx: FreshContext<NetzoState>,
) {
  if (skip(req, ctx)) return await ctx.next();

  // IMPORTANT: disable client-side navigation for around logout links to
  // skip partials which cause infinite redirects in auth middleware

  // check auth state
  const sessionId = ctx.state.auth?.sessionId;
  const isAuthenticated = sessionId !== undefined;

  // redirect to /auth if not authenticated or to / if authenticated
  if (ctx.url.pathname !== "/auth" && !isAuthenticated) {
    // console.debug("[auth] User logged out, redirecting to /auth");
    ctx.url.pathname = "/auth";
    return Response.redirect(ctx.url.href, 302);
  } else if (ctx.url.pathname === "/auth" && isAuthenticated) {
    // console.debug("[auth] User logged in, redirecting to /");
    ctx.url.pathname = "/";
    return Response.redirect(ctx.url.href, 302);
  }

  return await ctx.next();
}
