// import { MiddlewareHandlerContext } from "$fresh/server.ts";
// import { getSessionId } from "deno_kv_oauth/mod.ts";
// import { AuthenticationOptions } from "../plugin.ts";

// export interface AuthenticationState {
//   // options: AuthenticationOptions;
//   sessionId: string;
//   isAuthenticated: boolean;
// }

// export async function handler(
//   req: Request,
//   ctx: MiddlewareHandlerContext<AuthenticationState>,
// ) {
//   const url = new URL(req.url);
//   const skipDestination = !["route"].includes(ctx.destination);
//   const skipRoute = url.pathname.startsWith("/auth/"); // only /auth/:provider/...
//   if (skipDestination || skipRoute) return await ctx.next();

//   // check auth state
//   const sessionId = getSessionId(req) as string | undefined;
//   const isAuthenticated = sessionId !== undefined;

//   ctx.state = {
//     // options,
//     sessionId: sessionId as string,
//     isAuthenticated,
//   } as AuthenticationState;

//   console.log({ isAuthenticated, sessionId });

//   // redirect to /auth if not authenticated or to / if authenticated
//   if (url.pathname !== "/auth" && !isAuthenticated) {
//     console.debug("[auth] User logged out, redirecting to /auth");
//     url.pathname = "/auth";
//     return Response.redirect(url.href, 302);
//   } else if (url.pathname === "/auth" && isAuthenticated) {
//     console.debug("[auth] User logged in, redirecting to /");
//     url.pathname = "/";
//     return Response.redirect(url.href, 302);
//   }

//   return await ctx.next();
// }

// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getSessionId } from "deno_kv_oauth/mod.ts";
import { redirect } from "netzo/authentication/utils/redirect.ts";
import { Status } from "std/http/http_status.ts";
import {
  getUserBySession,
  // ifUserHasNotifications,
  // incrVisitsCountByDay,
} from "netzo/authentication/utils/db.ts";
import type { MetaProps } from "netzo/authentication/components/Meta.tsx";

export interface State extends MetaProps {
  sessionId?: string;
  hasNotifications?: boolean;
}

async function redirectToNewOrigin(
  req: Request,
  ctx: MiddlewareHandlerContext,
) {
  const { hostname } = new URL(req.url);
  return hostname === "saaskit.deno.dev"
    ? redirect("https://hunt.deno.land", Status.Found)
    : await ctx.next();
}

async function setState(req: Request, ctx: MiddlewareHandlerContext<State>) {
  if (!["route"].includes(ctx.destination)) return await ctx.next();

  const sessionId = await getSessionId(req);
  ctx.state.sessionId = sessionId;

  if (sessionId) {
    const user = await getUserBySession(sessionId);
    // ctx.state.hasNotifications = await ifUserHasNotifications(user!.login);
  }

  return await ctx.next();
}

// async function recordVisit(
//   _req: Request,
//   ctx: MiddlewareHandlerContext,
// ) {
//   if (ctx.destination !== "route") return await ctx.next();

//   await incrVisitsCountByDay(new Date());
//   return await ctx.next();
// }

export const handler = [
  redirectToNewOrigin,
  setState,
  // recordVisit,
];
