/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { type FreshConfig, start } from "../deps/$fresh/server.ts";
import { replace } from "../deps/object-replace-mustache.ts";
import { netzo } from "../apis/netzo/mod.ts";
import { createDatabase } from "./database.ts";
import { createNotification } from "./notification.ts";
import { proxyCron } from "./proxies/cron.ts";
import { log, logInfo, LOGS, logWarning } from "./utils/console.ts";
import { setEnvVars } from "./utils/mod.ts";
import type { Project } from "./types.ts";
import { auth, type AuthConfig, type AuthState } from "./plugins/auth/mod.ts";
import { api, type ApiConfig } from "./plugins/api/mod.ts";
import { ui, type UiConfig } from "./plugins/ui/mod.ts";
import { devtools, type DevtoolsConfig } from "./plugins/devtools/mod.ts";

export * from "./types.ts";

export type NetzoConfig = FreshConfig & {
  auth?: AuthConfig;
  ui?: UiConfig;
  api?: ApiConfig;
  devtools?: DevtoolsConfig;
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

export type NetzoOptions = {
  projectId: string;
  apiKey: string;
  baseURL?: string;
};

/**
 * Factory function for core Netzo modules
 * @param {Deno.Kv} kv - [optional] the KV instance to use (defaults to default KV)
 */
export const Netzo = async (kv?: Deno.Kv) => {
  kv ??= await Deno.openKv(Deno.env.get("DENO_KV_PATH"));

  const db = createDatabase(kv);
  const notification = createNotification(db);

  return { db, notification };
};

/**
 * Factory function for Netzo apps
 *
 * @param {NetzoConfig} partialConfig - the Netzo app config object
 * @returns {object} - an object of multiple utilities core to Netzo
 */
export async function createNetzoApp(partialConfig: Partial<NetzoConfig>) {
  const {
    NETZO_PROJECT_ID,
    NETZO_API_KEY,
    NETZO_API_URL = "https://api.netzo.io",
    NETZO_APP_URL = "https://app.netzo.io",
  } = Deno.env.toObject();
  const { DENO_ENV, NETZO_ENV } = setEnvVars({
    DENO_ENV: Deno.env.get("DENO_REGION") ? "production" : "development",
    NETZO_ENV: NETZO_PROJECT_ID && NETZO_API_KEY ? "production" : "development",
    NETZO_API_URL,
    NETZO_APP_URL,
  });

  const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH"));

  // [modules] create module utilities (these use kv, no need for apiKey)
  const { db, notification } = await Netzo(kv);

  // [deno] proxy deno primitives to augment NOT complement deno (see #81)
  Deno.cron = proxyCron(db);

  // [deno development] always log notice for good DX
  if (["development"].includes(DENO_ENV)) {
    if (!NETZO_PROJECT_ID || !NETZO_API_KEY) logInfo(LOGS.localEnvNotice);
  }
  // [netzo production] only if connected to production (remote) project
  if (["production"].includes(NETZO_ENV)) {
    // IMPORTANT: api used only during development for (optional) loading of env vars
    // since otherwise the framework becomes netzo-dependant and requires an NETZO_API_KEY
    // to run (which is undesired in order to have parity between development and production)
    const netzoApi = netzo({ apiKey: NETZO_API_KEY, baseURL: NETZO_API_URL });

    const project = await netzoApi.projects[NETZO_PROJECT_ID].get<Project>();

    if (!project) throw new Error(LOGS.notFoundProject);

    const envVars = project.envVars?.development ?? {};
    setEnvVars(envVars);
    logInfo(LOGS.remoteEnvNotice(Object.keys(envVars).length));

    const appUrl = new URL(
      `/workspaces/${project.workspaceId}/projects/${project._id}`,
      Deno.env.get("NETZO_APP_URL") ?? "https://app.netzo.io",
    );
    log(`\nOpen in netzo at ${appUrl.href}`);
  }

  // 1) render mustache values
  let config = replace(partialConfig, Deno.env.toObject());

  // 2) build state (pass single kv instance to plugins for performance)
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
        auth(state.config.auth),
        ui(state.config.ui),
        api(state.config.api),
      ],
      ...(config?.plugins ?? []),
    ],
  };

  return {
    start: async () => {
      if (Deno.args.includes("dev")) {
        const { default: dev } = await import("$fresh/dev.ts");
        return dev(Deno.mainModule, "./netzo.ts", config);
      } else {
        return start((await import("@/fresh.gen.ts")).default, config);
      }
    }, // NOTE: async but won't resolve (since dev/start won't) so we can't await it
  };
}
