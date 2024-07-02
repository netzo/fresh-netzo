import { defineRoute, type RouteConfig } from "fresh/server.ts";
import { type AdminConfig } from "../../admin/plugin.ts";
import { Card$Users } from "../islands/users.tsx";

// FIXME: not working for plugin-injected routes
// see https://github.com/denoland/fresh/issues/2296),
// https://github.com/denoland/fresh/issues/2352
// and https://github.com/denoland/fresh/pull/2297
export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};

export default (config: AdminConfig) => {
  const { db } = config;
  return defineRoute(async (req, ctx) => {
    const { permissions = [] } = ctx.state?.auth?.sessionUser?.data ?? {}; // defaults to none
    const $users = await db.query.$users.findMany();

    return <Card$Users $users={$users} permissions={permissions} />;
  });
};
