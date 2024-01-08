/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { start } from "../deps/$fresh/server.ts";
import { AuthState } from "./plugins/auth/mod.ts";
import { createPluginsForModules } from "./plugins/mod.ts";
import { Netzo } from "../core/mod.ts";
import { log, LOGS } from "./utils/console.ts";
import { setEnvVars } from "./utils/mod.ts";
// import { createClient } from "../cli/src/utils/netzo.ts";
import { resolveConfig } from "./config.ts";
import type { NetzoConfig, Project } from "./types.ts";

export * from "./types.ts";

export type NetzoApp = Awaited<ReturnType<typeof Netzo>> & {
  start: () => Promise<void>;
};

export type NetzoState = {
  app: Awaited<ReturnType<typeof Netzo>>;
  config: NetzoConfig;
  // injected by plugins:
  auth?: AuthState;
  [k: string]: unknown;
};

// WORKAROUND: until resolution of https://github.com/denoland/fresh/issues/1773#issuecomment-1763502518
const origConsoleError = console.error;
console.error = (msg) => {
  if (typeof msg === "string" && msg.includes("Improper nesting of table")) {
    return;
  }
  origConsoleError(msg);
};

export async function createNetzoApp(
  projectIdOrConfig: Project["_id"] | Partial<NetzoConfig>,
): Promise<NetzoApp> {
  if (typeof projectIdOrConfig === "string") {
    Deno.env.set("NETZO_PROJECT_ID", projectIdOrConfig); // inline ID takes precedence
  }

  const {
    NETZO_ENV = Deno.env.get("DENO_REGION") ? "production" : "development",
    NETZO_PROJECT_ID,
    NETZO_API_KEY,
    NETZO_API_URL = "https://api.netzo.io",
    NETZO_APP_URL = "https://app.netzo.io",
  } = Deno.env.toObject();

  if (!NETZO_PROJECT_ID) throw new Error(LOGS.missingProjectId);
  if (!NETZO_API_KEY) throw new Error(LOGS.missingApiKey);

  const app = await Netzo({ apiKey: NETZO_API_KEY, baseURL: NETZO_API_URL });

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
  const appUrl = Deno.env.get("NETZO_APP_URL") ?? "https://app.netzo.io";

  // 1) get inline or remote config
  let config: NetzoConfig = typeof projectIdOrConfig === "object"
    ? projectIdOrConfig // inline
    : project.config as NetzoConfig; // remote

  // 2) merge defaults and config and render mustache values
  config = resolveConfig(config, project);

  // 3) build state (pass single kv instance to plugins for performance)
  const state: NetzoState = { app, config };

  const { plugins = [] } = config;
  const netzoPlugins = await createPluginsForModules(state);

  if (DEV) {
    // [live-reload] listen for "project:patched" events and restart server
    // NOTE: this is only available in development mode since in production,
    // Spawning subprocesses is not allowed on Deno Deploy (throws PermissionDenied)
    // DISABLED: createClient requires importing feathersjs which blows up the bundle
    // so we disable live-reload for now, until we find a better solution (SSE or similar)
    //   const app = await createClient({
    //     apiKey: NETZO_API_KEY,
    //     baseURL: NETZO_API_URL,
    //   });
    //   const main = Deno.mainModule.replace("file://", "").replace(
    //     "netzo.ts",
    //     "fresh.gen.ts",
    //   );
    //   app.service("projects").on("patched", async (_project: Project) => {
    //     log("✨ App configuration updated, restarting server...");
    //     // trigger reload without modifying file using touch
    //     const process = new Deno.Command("touch", { args: [main] }).spawn();
    //     await process.status;
    //   });
    //   logInfo(`Listening for updates of app configuration...`);

    log(
      `\nOpen in netzo at ${appUrl}/workspaces/${project.workspaceId}/projects/${project._id}`,
    );
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
      ...netzoPlugins,
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
