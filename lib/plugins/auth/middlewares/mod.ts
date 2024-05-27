import type { FreshContext } from "fresh/server.ts";
import { getSessionId } from "../../../deps/deno_kv_oauth/mod.ts";
import type { NetzoState } from "../../../mod.ts";
import { AuthConfig, AuthState } from "../plugin.ts";
import { getFunctionsByProvider } from "../utils/providers/mod.ts";

export type NetzoStateWithAuth = NetzoState & {
  auth: AuthState;
};

const skip = (_req: Request, ctx: FreshContext<NetzoStateWithAuth>) => {
  if (!["route"].includes(ctx.destination)) return true;
  if (ctx.url.pathname.startsWith("/auth/")) return true; // skip auth routes (signin, callback, signout)
  if (ctx.url.pathname.startsWith("/database")) return true; // skip database routes
  if (ctx.url.pathname.startsWith("/datastore")) return true; // skip datastore routes
  if (ctx.url.pathname.startsWith("/storage")) return true; // skip storage routes
  // if (ctx.url.pathname.startsWith("/realtime")) return true; // skip realtime (SSE) routes
  if (ctx.url.searchParams.has("error")) return true; // skip if error
  return false;
};

export function createAuthState(config: AuthConfig) {
  return async (_req: Request, ctx: FreshContext<NetzoStateWithAuth>) => {
    ctx.state.auth ??= config.adapter;
    return await ctx.next();
  };
}

export async function setSessionState(
  req: Request,
  ctx: FreshContext<NetzoStateWithAuth>,
) {
  if (skip(req, ctx)) return await ctx.next();

  const sessionId = await getSessionId(req);
  ctx.state.auth = {
    ...ctx.state.auth,
    sessionId, // DO NOTE use to assert if authenticated (might be set but expired)
    sessionUser: undefined, // reset each request (before next())
    isAuthenticated: false, // reset each request (before next())
  };

  if (sessionId === undefined) return await ctx.next(); // A) not authenticated

  const user = await ctx.state.auth.getUserBySession(sessionId);
  if (!user) return await ctx.next(); // B) user not found

  // set authenticated state (sessionId could be set but expired,
  // so check for user to be defined to ensure authenticated state)
  ctx.state.auth.sessionUser = user;
  ctx.state.auth.isAuthenticated = true;

  return await ctx.next(); // C) authenticated
}

export async function assertUserIsMemberOfWorkspaceOfApiKeyIfProviderIsNetzo(
  req: Request,
  ctx: FreshContext<NetzoStateWithAuth>,
) {
  if (skip(req, ctx)) return await ctx.next();

  if (ctx.url.pathname.startsWith("/auth")) return await ctx.next(); // skip auth route

  const { sessionUser } = ctx.state.auth ?? {};

  // [netzo] assert user is member of workspace this project belongs to (check apiKey)
  if (sessionUser?.provider === "netzo") {
    const {
      NETZO_API_KEY,
      NETZO_API_URL = "https://api.netzo.io",
    } = Deno.env.toObject(); // MUST be set if using Netzo Auth Provider
    const response = await fetch(`${NETZO_API_URL}/workspace-users`, {
      headers: { "x-api-key": NETZO_API_KEY },
    });
    const result = await response.json();
    const userIsMemberOfWorkspaceOfApiKey = !!result?.data?.some?.(
      (wu: { userId: string }) => wu.userId === sessionUser?.authId,
    );
    if (!userIsMemberOfWorkspaceOfApiKey) {
      return new Response("", {
        status: 307,
        headers: {
          Location: "/auth?error=You do not have access to this application.",
        },
      }); // redirect to relative path
    } else ctx.url.searchParams.delete("error");
  }

  return await ctx.next();
}

export function createAssertUserIsAuthorized(config: AuthConfig) {
  return async (req: Request, ctx: FreshContext<NetzoStateWithAuth>) => {
    if (skip(req, ctx)) return await ctx.next();

    if (ctx.url.pathname.startsWith("/auth")) return await ctx.next(); // skip auth route

    const { sessionUser } = ctx.state.auth ?? {};

    if (sessionUser) {
      try {
        await config?.assertAuthorization?.(sessionUser, req, ctx);
        ctx.url.searchParams.delete("error");
      } catch (e: Error | unknown) {
        const [_, __, signOut] = getFunctionsByProvider(sessionUser.provider);
        await signOut(req);
        const { message = "You are not authorized to sign in." } = e as Error;
        return new Response("", {
          status: 307,
          headers: { Location: `/auth?error=${message}` },
        }); // redirect to relative path
      }
    }

    return await ctx.next();
  };
}

export async function setRequestState(
  req: Request,
  ctx: FreshContext<NetzoStateWithAuth>,
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
  ctx: FreshContext<NetzoStateWithAuth>,
) {
  if (skip(req, ctx)) return await ctx.next();

  // IMPORTANT: disable client-side navigation for around logout links to
  // skip partials which cause infinite redirects in auth middleware

  // check isAuthenticated state explicitly (sessionId could be set yet expired)
  const { isAuthenticated } = ctx.state.auth ?? {};

  // redirect to /auth if not authenticated or to / if authenticated
  if (ctx.url.pathname !== "/auth" && !isAuthenticated) {
    // console.debug("[auth] User logged out, redirecting to /auth");
    ctx.url.pathname = "/auth";
    return Response.redirect(ctx.url.href, 302);
  } else if (ctx.url.pathname === "/auth" && isAuthenticated) {
    // console.debug("[auth] User logged in, redirecting to /");
    ctx.url.searchParams.delete("error");
    ctx.url.pathname = "/";
    return Response.redirect(ctx.url.href, 302);
  }

  return await ctx.next();
}
