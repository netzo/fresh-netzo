/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { type FreshConfig, start } from "./deps/$fresh/server.ts";
import { replace } from "./deps/object-replace-mustache.ts";
import { setEnvVarsIfRemoteProject } from "./utils.ts";
import { createNotification } from "./notifications/mod.ts";
import { proxyCron } from "./cron/mod.ts";
import { proxyConsole } from "./utils.console.ts";
import { auth, type AuthConfig, type AuthState } from "./auth/plugin.ts";
import {
  services,
  type ServicesConfig,
  type ServicesState,
} from "./services/plugin.ts";
import { ui, type UiConfig } from "./ui/plugin.ts";
import { devtools } from "./devtools/plugin.ts";

export * from "./types.ts";

export type NetzoConfig = FreshConfig & {
  auth?: AuthConfig;
  services?: ServicesConfig;
  ui?: UiConfig;
};

export type NetzoState = {
  kv: Deno.Kv;
  notification: ReturnType<typeof createNotification>;
  config: NetzoConfig;
  // injected by plugins:
  auth?: AuthState;
  [k: string]: unknown;
};

// WORKAROUND: silence selected messages by substrings
console = proxyConsole(
  `Comparison using the "!==" operator here is always true`,
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
  const notification = createNotification(kv);

  // [deno] proxy deno primitives
  Deno.cron = proxyCron(kv);

  // [app/config] render mustache values
  config = replace(config, Deno.env.toObject());
  // [app/state] build state (pass single kv instance to plugins for performance)
  const state: NetzoState = { kv, notification, config };

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
        services(config.services),
        ui(config.ui),
      ],
      ...(config?.plugins ?? []),
    ],
  };

  return {
    kv,
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
