/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { type FreshConfig, start as _start } from "./deps/$fresh/server.ts";
import { proxyConsole } from "./plugins/utils.ts";
import type { AuthState } from "./plugins/auth/plugin.ts";
import type { ApiState } from "./plugins/api/plugin.ts";
import type { CronState } from "./plugins/cron/plugin.ts";
import type { EnvironmentsState } from "./plugins/environments/plugin.ts";

export type NetzoConfig = FreshConfig;

export type NetzoState = {
  kv: Deno.Kv;
  config: NetzoConfig;
  auth?: AuthState;
  api?: ApiState;
  cron?: CronState;
  environments?: EnvironmentsState;
  [k: string]: unknown;
};

// deno-lint-ignore no-global-assign
console = proxyConsole(
  `Comparison using the "!==" operator here is always true`,
  `Not implemented: ClientRequest.options.createConnection`,
  `Use of deprecated "`, // Deno 2.0 warnings (see https://github.com/denoland/fresh/issues/2276)
); // WORKAROUND: silence selected messages by substrings

/**
 * Factory function for Netzo apps
 *
 * Netzo is a Deno framework for building full-stack web apps
 * faster with less code via an opinionated set of plugins and conventions.
 *
 * @example import { createNetzoApp } from "netzo/mod.ts"
 * const app = await createNetzoApp({ ... })
 * if (import.meta.main) app.start()
 *
 * @param {NetzoConfig} config - configuration options for the application
 * @returns {object} - an application instance
 */
export const createNetzoApp = async (config: Partial<NetzoConfig>) => {
  // [kv] defaults to local database (development) or remote database (production)
  const kv = await Deno.openKv();

  // [app/state] build state (pass single kv instance to plugins for performance)
  const state: NetzoState = { kv, config };

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
      ...(config?.plugins ?? []),
    ],
  } satisfies NetzoConfig;

  return {
    kv,
    config,
    start: async () => {
      if (Deno.args.includes("dev")) {
        const { default: dev } = await import("$fresh/dev.ts");
        return dev(Deno.mainModule, "./netzo.ts", config);
      } else {
        // FIXME: the fix introduced in  is causing deploytime error
        // "The deployment failed: UNCAUGHT_EXCEPTION TypeError: module
        // not found: 'file:///src/fresh.gen.ts' at async Object.start()"
        // so we revert to relying on import alias "@" for now despite
        // this breaking types in development. This is a temporary fix
        // see https://github.com/netzo/netzo/issues/85#issuecomment-1929225550
        return _start((await import("@/fresh.gen.ts")).default, config);
      }
    }, // NOTE: async but won't resolve (since dev/start won't) so we can't await it
  };
};
