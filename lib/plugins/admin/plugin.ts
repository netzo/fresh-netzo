// @deno-types="npm:@types/react@18.2.60"

import type { Plugin } from "fresh/server.ts";
import type { LibSQLDatabase } from "netzo/deps/drizzle-orm/libsql.ts";
import type { NetzoState } from "../../mod.ts";
import { createAdminState, ensureSignedIn } from "./middlewares/mod.ts";
import createRouteIndex from "./routes/index.tsx";
import createRouteUsers from "./routes/users.tsx";

export type AdminConfig<T = Record<string, unknown>> = {
  /** The drizzle-orm database client to use for the admin plugin. */
  db: LibSQLDatabase<T>;
  /** The locale to use for the Toolbar plugin (defaults to "es"). */
  locale?: "en" | "es";
};

// deno-lint-ignore ban-types
export type AdminState = {};

/**
 * A fresh plugin that registers middleware and handlers to
 * handle admi
 *
 * @param {AdminConfig} - configuration options for the plugin
 * @returns {Plugin} - a Plugin for Deno Fresh
 */
export const admin = (config: AdminConfig): Plugin<NetzoState> => {
  const adminEnabled = config?.db;
  if (!adminEnabled) return { name: "netzo.admin" }; // skip if admin but no providers are set

  // @ts-ignore - we know these are defined
  const { $users, $sessions } = config?.db?._?.fullSchema! ?? {}; // use fullSchema, not schema
  if (!$users) throw new Error(`Missing "$users" table in database schema`);
  if (!$sessions) throw new Error(`Missing "$sessions" table in database schema`);

  return {
    name: "netzo.admin",
    middlewares: [
      {
        path: "/admin",
        middleware: { handler: createAdminState(config) },
      },
      {
        path: "/admin",
        middleware: { handler: ensureSignedIn },
      },
    ],
    routes: [
      {
        path: "/admin",
        component: createRouteIndex(config),
      },
      {
        path: `/admin/users`,
        component: createRouteUsers(config),
      },
    ],
    islands: {
      baseLocation: import.meta.url,
      paths: [
        "./islands/users.tsx",
      ],
    },
  };
};
