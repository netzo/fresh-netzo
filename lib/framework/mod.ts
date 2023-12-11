import type { FreshConfig } from "../deps/$fresh/src/server/mod.ts";
import type { Project } from "../deps/@netzo/api/mod.ts";
import replace from "https://esm.sh/v135/object-replace-mustache@1.0.2";
import { deepMerge } from "../deps/std/collections/deep_merge.ts";
import { AuthState } from "../framework/plugins/auth/mod.ts";
import { LayoutState } from "../framework/plugins/layout/mod.ts";
import { ThemeState } from "../framework/plugins/theme/mod.ts";
import { ApiState } from "../framework/plugins/api/mod.ts";
import { DevtoolsState } from "../framework/plugins/devtools/mod.ts";
import { netzo } from "../apis/netzo/mod.ts";
import { log, logInfo, LOGS } from "../framework/utils/console.ts";
import { setEnvVars } from "../framework/utils/mod.ts";
import { PROJECT_CONFIG } from "./defaults.ts";
import { createClient } from "../cli/src/utils/netzo.ts";

export type { Project };

export type AppConfig = FreshConfig & Project["config"];

export type NetzoState = {
  kv: Deno.Kv;
  config: Project["config"];
  auth?: AuthState;
  layout?: LayoutState;
  theme?: ThemeState;
  api?: ApiState;
  devtools?: DevtoolsState;
  [k: string]: unknown;
};

if (import.meta.main) await createApp({}); // allow running as script

// WORKAROUND: until resolution of https://github.com/denoland/fresh/issues/1773#issuecomment-1763502518
const origConsoleError = console.error;
console.error = (msg) => {
  if (typeof msg === "string" && msg.includes("Improper nesting of table")) {
    return;
  }
  origConsoleError(msg);
};

export async function createApp(
  partialConfig: Partial<AppConfig> = {},
): Promise<Required<AppConfig>> {
  if (Deno.args[0] === "build") return partialConfig as Required<AppConfig>;

  const {
    NETZO_ENV = Deno.env.get("DENO_REGION") ? "production" : "development",
    NETZO_PROJECT_ID,
    NETZO_API_KEY,
    NETZO_API_URL = "https://api.netzo.io",
    NETZO_APP_URL = "https://app.netzo.io",
  } = Deno.env.toObject();
  const { plugins = [] } = partialConfig ?? {};

  if (!NETZO_PROJECT_ID) throw new Error(LOGS.missingProjectId);
  if (!NETZO_API_KEY) throw new Error(LOGS.missingApiKey);

  const { api } = netzo({ apiKey: NETZO_API_KEY, baseURL: NETZO_API_URL });

  const project = await api.projects[NETZO_PROJECT_ID].get<Project>();
  if (!project) throw new Error(LOGS.notFoundProject);

  Deno.env.set("NETZO_ENV", NETZO_ENV);
  Deno.env.set("NETZO_PROJECT_ID", NETZO_PROJECT_ID);
  Deno.env.set("NETZO_PROJECT_UID", project.uid);
  Deno.env.set("NETZO_API_KEY", NETZO_API_KEY);
  Deno.env.set("NETZO_API_URL", NETZO_API_URL);
  Deno.env.set("NETZO_APP_URL", NETZO_APP_URL);
  Deno.env.set(
    "NETZO_DATABASE_IDS",
    JSON.stringify({
      default: project.databaseId,
    }),
  );

  const DEV = ["development"].includes(NETZO_ENV)

  if (DEV) setEnvVars(project.envVars?.development ?? {});
  const appUrl = Deno.env.get("NETZO_APP_URL") ?? "https://app.netzo.io";

  // 1) merge defaults and remote config
  let config = deepMerge({ config: PROJECT_CONFIG }, project.config);
  // 2) merge local config (local config takes precedence for better DX)
  config = deepMerge(config, partialConfig as NetzoState);
  // 3) render values with mustache placeholders
  config = replace(config, { project });
  // 4) build state (pass single kv instance to plugins for performance)
  const state: NetzoState = { kv: await Deno.openKv(), config };

  if (DEV) logInfo(`Merged remote and local app configuratitions`);

  const netzoPlugins = await createPluginsForModules(state);

  // [live-reload] listen for "project:patched" events and restart server
  // NOTE: this is only available in development mode since in production,
  // Spawning subprocesses is not allowed on Deno Deploy (throws PermissionDenied)
  if (DEV) {
    const app = await createClient({
      apiKey: NETZO_API_KEY,
      baseURL: NETZO_API_URL,
    });
    const main = Deno.mainModule.replace("file://", "").replace("/.dev.ts", "");
    app.service("projects").on("patched", async (_project: Project) => {
      log("✨ App configuration updated, restarting server...");
      // trigger reload without modifying file using touch
      const process = new Deno.Command("touch", { args: [main] }).spawn();
      await process.status;
    });
    logInfo(`Listening for updates of app configuration...`);

    log(
      `\nOpen in netzo at ${appUrl}/workspaces/${project.workspaceId}/projects/${project._id}`,
    );
  }

  return {
    ...partialConfig,
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
      ...netzoPlugins,
      ...plugins,
    ],
  };
}

/**
 * An internal utility to bundle plugins based on app configuration.
 * @param state {NetzoState} - the app configuration
 * @returns {Promise<Plugin[]>} - the bundled plugins
 */
async function createPluginsForModules(state: NetzoState): Promise<Plugin[]> {
  // NOTE: async plugin initialization is parallelized for better performance
  const PLUGINS = ["kv", "auth", "api", "layout", "theme", "devtools"];
  const pluginsWithDuplicates = (await Promise.all(
    PLUGINS.map(async (name) => {
      if (!state.config?.[name]?.enabled) return; // skip disabled plugins
      switch (name) {
        case "kv": {
          return;
        }
        case "auth": {
          const mod = await import("./plugins/auth/mod.ts");
          return [mod.auth(state.config[name])];
        }
        case "layout": {
          const mod = await import("./plugins/layout/mod.ts");
          const { theme } = await import("./plugins/theme/mod.ts");
          return [
            mod.layout(state.config[name]),
            theme(state.config.theme),
          ];
        }
        case "theme": {
          const mod = await import("./plugins/theme/mod.ts");
          return [mod.theme(state.config[name])];
        }
        case "api": {
          const mod = await import("./plugins/api/mod.ts");
          return [mod.api(state.config[name])];
        }
        case "devtools": {
          const mod = await import("./plugins/devtools/mod.ts");
          return [mod.devtools(state.config[name])];
        }
      }
    }),
  )).flat().filter((plugin) => !!plugin?.name);

  // deduplicate plugins by name (uses includes(searchElement, fromIndex))
  const names = pluginsWithDuplicates.map(({ name }) => name);
  const plugins = pluginsWithDuplicates.filter(
    ({ name }, i) => !names.includes(name, i + 1),
  );
  logInfo(`Plugins: ${
    plugins.map(
      ({ name }) => `${!!state.config[name]?.enabled ? "✅" : "❌"} ${name}`,
    ).join(" | ")
  }`);

  return plugins;
}
