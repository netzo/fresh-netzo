import type { FreshContext } from "fresh/server.ts";
import type { NetzoState } from "../../../mod.ts";
import { AdminConfig, AdminState } from "../plugin.ts";

export type NetzoStateWithAdmin = NetzoState & {
  admin: AdminState;
};

const SKIP = ["/uno.css"]; // NOTE: somehow ctx.destination is "route" and not "static" for uno.css

const skip = (_req: Request, ctx: FreshContext<NetzoStateWithAdmin>) => {
  if (!["route"].includes(ctx.destination)) return true;
  if (SKIP.includes(ctx.url.pathname)) return true;
  return false;
};

export function createAdminState(config: AdminConfig) {
  return async (_req: Request, ctx: FreshContext<NetzoStateWithAdmin>) => {
    ctx.state.admin ??= config;
    console.log("createAdminState");
    return await ctx.next();
  };
}

export async function ensureSignedIn(
  req: Request,
  ctx: FreshContext<NetzoStateWithAdmin>,
) {
  if (skip(req, ctx)) return await ctx.next();

  console.log("ensureSignedIn");
  const { permissions = [] } = ctx.state?.auth?.sessionUser?.data ?? {}; // defaults to none

  // TODO: check if user has admin permissions
  // if (!permissions.includes("admin")) {
  //   ctx.url.pathname = "/";
  //   return Response.redirect(ctx.url.href, 302);
  // }

  return await ctx.next();
}
