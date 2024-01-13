/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { type FreshConfig, start } from "../deps/$fresh/server.ts";
import { replace } from "../deps/object-replace-mustache.ts";
import { Netzo } from "../platform/mod.ts";
import { log, LOGS, logWarning } from "./utils/console.ts";
import { setEnvVars } from "./utils/mod.ts";
import type { Project } from "./types.ts";
import { auth, type AuthConfig, type AuthState } from "./plugins/auth/mod.ts";
import { api, type ApiConfig } from "./plugins/api/mod.ts";
import { ui, type UiConfig } from "./plugins/ui/mod.ts";
import { devtools, type DevtoolsConfig } from "./plugins/devtools/mod.ts";

export * from "../platform/mod.ts";
export * from "./types.ts";

export type NetzoConfig = FreshConfig & {
  auth?: AuthConfig;
  ui?: UiConfig;
  api?: ApiConfig;
  devtools?: DevtoolsConfig;
};

export type NetzoState = {
  app: Awaited<ReturnType<typeof Netzo>>;
  config: NetzoConfig;
  // injected by plugins:
  auth?: AuthState;
  [k: string]: unknown;
};

export type NetzoApp = Awaited<ReturnType<typeof Netzo>> & {
  start: () => Promise<void>;
};

/**
 * Factory function for Netzo apps
 *
 * @param {NetzoConfit} partialConfig - the Netzo app config object
 * @returns {object} - an object of multiple utilities core to Netzo
 */
export async function createNetzoApp(
  partialConfig: Partial<NetzoConfig>,
): Promise<NetzoApp> {
  const {
    NETZO_ENV = Deno.env.get("DENO_REGION") ? "production" : "development",
    NETZO_PROJECT_ID,
    NETZO_API_KEY,
    NETZO_API_URL = "https://api.netzo.io",
    NETZO_APP_URL = "https://app.netzo.io",
  } = Deno.env.toObject();

  if (!NETZO_PROJECT_ID) logWarning(LOGS.missingProjectId);
  if (!NETZO_API_KEY) logWarning(LOGS.missingApiKey);

  const app = await Netzo({
    projectId: NETZO_PROJECT_ID,
    apiKey: NETZO_API_KEY,
    baseURL: NETZO_API_URL,
  });

  const DEV = ["development"].includes(NETZO_ENV);

  const project = await app.api.projects[NETZO_PROJECT_ID].get<Project>();

  if (!project) throw new Error(LOGS.notFoundProject);

  Deno.env.set("NETZO_ENV", NETZO_ENV);
  Deno.env.set("NETZO_PROJECT_ID", NETZO_PROJECT_ID);
  Deno.env.set("NETZO_PROJECT_UID", project.uid);
  Deno.env.set("NETZO_API_KEY", NETZO_API_KEY);
  Deno.env.set("NETZO_API_URL", NETZO_API_URL);
  Deno.env.set("NETZO_APP_URL", NETZO_APP_URL);

  if (DEV) setEnvVars(project.envVars?.development ?? {});

  // 1) render mustache values
  let config = replace(partialConfig, Deno.env.toObject());

  // 2) build state (pass single kv instance to plugins for performance)
  const state: NetzoState = { app, config };

  const { plugins = [] } = config;

  if (DEV) {
    const appUrl = Deno.env.get("NETZO_APP_URL") ?? "https://app.netzo.io";
    const appUrlProject =
      `${appUrl}/workspaces/${project.workspaceId}/projects/${project._id}`;
    log(`\nOpen in netzo at ${appUrlProject}`);
  }

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
      ...plugins,
    ],
  };

  return {
    ...app,
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
