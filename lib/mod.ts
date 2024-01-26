/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { type FreshConfig, start } from "./deps/$fresh/server.ts";
import { replace } from "./deps/object-replace-mustache.ts";
import {
  createDatabase,
  createNotification,
  setEnvVarsIfRemoteProject,
} from "./utils/mod.ts";
import { proxyCron } from "./utils/proxies/cron.ts";
import { proxyConsole } from "./utils/proxies/console.ts";
import { auth, type AuthConfig, type AuthState } from "./auth/plugin.ts";
import { database, type DatabaseConfig } from "./database/plugin.ts";
import { ui, type UiConfig } from "./ui/plugin.ts";
import { devtools } from "./devtools/plugin.ts";

export * from "./types.ts";

export type NetzoConfig = FreshConfig & {
  auth?: AuthConfig;
  database?: DatabaseConfig;
  ui?: UiConfig;
};

export type NetzoState = {
  kv: Deno.Kv;
  db: ReturnType<typeof createDatabase>;
  notification: ReturnType<typeof createNotification>;
  config: NetzoConfig;
  // injected by plugins:
  auth?: AuthState;
  [k: string]: unknown;
};

// WORKAROUND: silence selected messages by substrings until resolution of
// https://github.com/denoland/fresh/issues/1773#issuecomment-1763502518
console = proxyConsole(
  `Comparison using the "!==" operator here is always true`,
  "Improper nesting of table",
  `Not implemented: ClientRequest.options.createConnection`,
  `Use of deprecated "`, // Deno 2.0 warnings (see https://github.com/denoland/fresh/issues/2276)
);

/**
 * Factory function for Netzo apps
 *
 * Netzo is a Deno framework for building full-stack web apps
 * faster with less code via an opinionated set of plugins and conventions.
 *
 * @example import { Netzo } from "netzo/mod.ts"
 * const netzo = await Netzo({ ... })
 * if (import.meta.main)netzo.start()
 *
 * @param {NetzoConfig} config - the Netzo app config object
 * @returns {object} - an object of multiple utilities core to Netzo
 */
export const Netzo = async (config: Partial<NetzoConfig>) => {
  // [development] load development envVars if referencing remote project
  if (!Deno.env.get("DENO_REGION")) await setEnvVarsIfRemoteProject();

  // [kv] defaults to local database (development) or remote database (production)
  const kv = await Deno.openKv();

  // [utils] create utilities (these use kv, not apiKey/projectId)
  const db = createDatabase(kv);
  const notification = createNotification(db);

  // [deno] proxy deno primitives
  Deno.cron = proxyCron(db);

  // [app/config] render mustache values
  config = replace(config, Deno.env.toObject());
  // [app/state] build state (pass single kv instance to plugins for performance)
  const state: NetzoState = { kv, db, notification, config };

  config = {
    ...config,
    plugins: [
      {
        name: "config",
        middlewares: [
          {
            path: "/",
            middleware: {
              handler: (_req, ctx) => {
                ctx.state = state;
                return ctx.next();
              },
            },
          },
        ],
      },
      ...devtools(),
      // IMPORTANT: must register all plugins (even if disabled) to ensure they
      // are always bundled at build time since some might depend on others
      ...[
        auth(config.auth),
        database(config.database),
        ui(config.ui),
      ],
      ...(config?.plugins ?? []),
    ],
  };

  return {
    kv,
    db,
    notification,
    config,
    start: async () => {
      if (Deno.args.includes("dev")) {
        const { default: dev } = await import("$fresh/dev.ts");
        return dev(Deno.mainModule, "./netzo.ts", config);
      } else {
        return start((await import("@/fresh.gen.ts")).default, config);
      }
    }, // NOTE: async but won't resolve (since dev/start won't) so we can't await it
  };
};
