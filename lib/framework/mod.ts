/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />
import type { FreshConfig } from "../deps/$fresh/server.ts";
import type { Project } from "../deps/@netzo/api/mod.ts";
import replace from "https://esm.sh/v135/object-replace-mustache@1.0.2";
import { deepMerge } from "../deps/std/collections/deep_merge.ts";
import { AuthState } from "./plugins/auth/mod.ts";
import { LayoutState } from "./plugins/layout/mod.ts";
import { ThemeState } from "./plugins/theme/mod.ts";
import { ApiState } from "./plugins/api/mod.ts";
import { DevtoolsState } from "./plugins/devtools/mod.ts";
import { createPluginsForModules } from "./plugins/utils.ts";
import { Netzo } from "../core/mod.ts";
import { log, logInfo, LOGS } from "./utils/console.ts";
import { setEnvVars } from "./utils/mod.ts";
import { CONFIG } from "./defaults.ts";
import { createClient } from "../cli/src/utils/netzo.ts";

export type { Project };

export type NetzoConfig = FreshConfig & Project["config"];

export type NetzoState = {
  kv: Deno.Kv;
  netzo: Awaited<ReturnType<typeof Netzo>>;
  config: Project["config"];
  // injected by plugins:
  auth?: AuthState;
  layout?: LayoutState;
  theme?: ThemeState;
  api?: ApiState;
  devtools?: DevtoolsState;
  [k: string]: unknown;
};

if (import.meta.main) await createNetzoApp(); // allow running as script

// WORKAROUND: until resolution of https://github.com/denoland/fresh/issues/1773#issuecomment-1763502518
const origConsoleError = console.error;
console.error = (msg) => {
  if (typeof msg === "string" && msg.includes("Improper nesting of table")) {
    return;
  }
  origConsoleError(msg);
};

export async function createNetzoApp(
  partialConfig: Partial<NetzoConfig> = {},
): Promise<Required<NetzoConfig>> {
  if (Deno.args.includes("build")) return partialConfig as Required<NetzoConfig>;

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

  const netzo = await Netzo({ apiKey: NETZO_API_KEY, baseURL: NETZO_API_URL });

  const project = await netzo.api.projects[NETZO_PROJECT_ID].get<Project>();
  if (!project) throw new Error(LOGS.notFoundProject);

  const DEV = ["development"].includes(NETZO_ENV);

  Deno.env.set("NETZO_ENV", NETZO_ENV);
  Deno.env.set("NETZO_PROJECT_ID", NETZO_PROJECT_ID);
  Deno.env.set("NETZO_PROJECT_UID", project.uid);
  Deno.env.set("NETZO_API_KEY", NETZO_API_KEY);
  Deno.env.set("NETZO_API_URL", NETZO_API_URL);
  Deno.env.set("NETZO_APP_URL", NETZO_APP_URL);
  if (!DEV) Deno.env.set("NETZO_DATABASE_ID", project.databaseId);

  if (DEV) setEnvVars(project.envVars?.development ?? {});
  const appUrl = Deno.env.get("NETZO_APP_URL") ?? "https://app.netzo.io";


  // 1) merge defaults and remote config
  const mergeOptions = { arrays: "replace", maps: "replace", sets: "replace" } as const;
  let config = deepMerge(CONFIG, project.config, mergeOptions);
  // 2) merge local config (local config takes precedence for better DX)
  config = deepMerge(config, partialConfig, mergeOptions);
  // 3) render values with mustache placeholders
  config = replace(config, { project });
  // 4) build state (pass single kv instance to plugins for performance)
  const state: NetzoState = { kv: await Deno.openKv(), netzo, config };

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
    const main = Deno.mainModule.replace("file://", "").replace("netzo.ts", "fresh.gen.ts");
    console.log(main)
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

export const start = async (config: NetzoConfig) => {
  if (Deno.args.includes("dev")) {
    const { default: dev } = await import("$fresh/dev.ts");
    await dev(Deno.mainModule, "./netzo.ts", config);
  } else {
    const manifestURL = new URL("./fresh.gen.ts", Deno.mainModule).href;
    const { default: manifest } = await import(manifestURL);
    const { start } = await import("$fresh/server.ts");
    await start(manifest, config);
  }
};
