import type { FreshConfig } from "../deps/$fresh/src/server/mod.ts";
import type { Project } from "https://esm.sh/@netzo/api@1.0.52/lib/client.d.ts";
import replace from "https://esm.sh/object-replace-mustache@1.0.2";
import { deepMerge } from "../deps/std/collections/deep_merge.ts";
import { AuthState } from "../framework/plugins/auth/mod.ts";
import { LayoutState } from "../framework/plugins/layout/mod.ts";
import { ThemeState } from "../framework/plugins/theme/mod.ts";
import { PagesState } from "../framework/plugins/pages/mod.ts";
import { ApiState } from "../framework/plugins/api/mod.ts";
import { DevtoolsState } from "../framework/plugins/devtools/mod.ts";
import { netzo } from "../apis/netzo/mod.ts";
import { log, logInfo, LOGS } from "../framework/utils/console.ts";
import { setEnvVars } from "../framework/utils/mod.ts";
import { APP_CONFIG } from "./defaults.ts";
import { createClient } from "../cli/src/utils/netzo.ts";

export type { Project };

export type AppConfig = FreshConfig & Project["config"];

export type NetzoState = {
  kv: Deno.Kv;
  config: Project["config"];
  auth?: AuthState;
  layout?: LayoutState;
  theme?: ThemeState;
  pages?: PagesState;
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

  if (["development"].includes(NETZO_ENV)) {
    setEnvVars(project.envVars?.development ?? {});
  }
  const appUrl = Deno.env.get("NETZO_APP_URL") ?? "https://app.netzo.io";

  // 1) merge defaults and remote config
  let state: NetzoState = deepMerge(APP_CONFIG, {
    kv: await Deno.openKv(), // pass kv instance to plugins (prevent multiple connections)
    config: project.config,
  });
  // 2) merge local config (local config takes precedence for better DX)
  state = deepMerge(state, partialConfig as NetzoState);
  // 3) render values with mustache placeholders
  state = replace(state, { project });

  logInfo(`Merged remote and local app configuratitions`);

  const netzoPlugins = await createPluginsForModules(state);

  // [live-reload] listen for "project:patched" events and restart server
  const app = await createClient({
    apiKey: NETZO_API_KEY,
    baseURL: NETZO_API_URL,
  });
  const main = Deno.mainModule.replace("file://", "").replace("/.dev.ts", "");
  app.service("projects").on("patched", async (_project: Project) => {
    log("✨ App configuration updated, restarting server...");
    // trigger reload without modifying file using touch
    const process =  new Deno.Command("touch",{ args: [main] }).spawn();
    await process.status;
  });
  logInfo(`Listening for updates of app configuration...`);

  log(
    `\nOpen in netzo at ${appUrl}/workspaces/${project.workspaceId}/projects/${project._id}`,
  );

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
  const pluginsWithDuplicates = (await Promise.all(
    Object.entries(state).map(async ([key, options]) => {
      if (!options?.enabled) return; // skip disabled plugins
      switch (key) {
        case "kv": {
          return;
        }
        case "auth": {
          const mod = await import("./plugins/auth/mod.ts");
          return mod.auth(options);
        }
        case "api": {
          const mod = await import("./plugins/api/mod.ts");
          return mod.api(options);
        }
        case "layout": {
          const mod = await import("./plugins/layout/mod.ts");
          const { theme } = await import("./plugins/theme/mod.ts");
          const { presetNetzo } = await import(
            "./plugins/theme/plugins/preset-netzo.ts"
          );
          return [
            mod.layout(options),
            theme(options.theme),
          ];
        }
        case "theme": {
          const mod = await import("./plugins/theme/mod.ts");
          const { presetNetzo } = await import(
            "./plugins/theme/plugins/preset-netzo.ts"
          );
          return [
            mod.theme(options),
          ];
        }
        case "pages": {
          const mod = await import("./plugins/pages/mod.ts");
          const { theme } = await import("./plugins/theme/mod.ts");
          const { presetNetzo } = await import(
            "./plugins/theme/plugins/preset-netzo.ts"
          );
          return [
            mod.pages(options),
            theme(options.theme),
          ];
        }
        case "api": {
          const mod = await import("./plugins/api/mod.ts");
          return mod.api(options);
        }
        case "devtools": {
          const mod = await import("./plugins/devtools/mod.ts");
          return [
            mod.devtools(options),
          ];
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
      ({ name }) => `${!!state[name]?.enabled ? "✅" : "❌"} ${name}`,
    ).join(" | ")
  }`);

  return plugins;
}
