import type { FreshConfig } from "../deps/$fresh/src/server/mod.ts";
import type { Project } from "https://esm.sh/@netzo/api@1.0.52/lib/client.d.ts";
import replace from "https://esm.sh/object-replace-mustache@1.0.2";
import { deepMerge } from "../deps/std/collections/deep_merge.ts";
import { AccessState } from "../framework/plugins/access/mod.ts";
// import { ApiState } from "../framework/plugins/api/mod.ts";
import { PortalState } from "../framework/plugins/portal/mod.ts";
import { UiState } from "../framework/plugins/ui/mod.ts";
import { netzo } from "../apis/netzo/mod.ts";
import { log, logInfo, LOGS } from "../framework/utils/console.ts";
import { setEnvVars } from "../framework/utils/mod.ts";
import { bindSignal } from "../framework/plugins/bindSignal/mod.ts";

export type { Project };

export type AppConfig = FreshConfig & {
  entrypoint?: string;
  importMap?: string;
  denoLock?: string;
  [k: string]: unknown;
};

export type NetzoState = {
  kv: Deno.Kv;
  access?: AccessState;
  // api?: ApiState;
  portal?: PortalState;
  ui?: UiState;
  plugins?: Project["plugins"];
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
  partialConfig: Partial<AppConfig>,
): Promise<Required<AppConfig>> {
  if (Deno.args[0] === "build") return partialConfig as Required<AppConfig>;

  const {
    NETZO_ENV = Deno.env.get("DENO_REGION") ? "production" : "development",
    NETZO_PROJECT_ID,
    NETZO_API_KEY,
    NETZO_API_URL = "https://api.netzo.io",
    NETZO_APP_URL = "https://app.netzo.io",
  } = Deno.env.toObject();
  const { plugins = [] } = partialConfig;

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

  const { access, portal, ui } = project.app ?? {};

  let state: NetzoState = deepMerge({
    kv: await Deno.openKv(),
    access,
    portal,
    ui,
  }, partialConfig); // NOTE: developer config takes precedence for better DX

  state = replace(state, { project });

  logInfo(`Merged remote and local app configuratitions`);

  const netzoPlugins = await createPlugins(state);

  logInfo(
    `Initialized ${plugins.length} plugins: ${
      plugins.map((p) => p.name).join(", ")
    }`,
  );

  log(
    `Open in netzo at ${appUrl}/workspaces/${project.workspaceId}/projects/${project._id}`,
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
      bindSignal(),
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
async function createPlugins(state: NetzoState): Promise<Plugin[]> {
  // NOTE: async plugin initialization is parallelized for better performance
  const plugins = (await Promise.all(
    Object.entries(state).map(async ([key, options]) => {
      switch (key) {
        case "access": {
          const mod = await import("./plugins/access/mod.ts");
          return mod.access(options);
        }
        case "api": {
          const mod = await import("./plugins/api/mod.ts");
          return mod.api(options);
        }
        case "portal": {
          const mod = await import("./plugins/portal/mod.ts");
          return mod.portal(options);
        }
        case "ui": {
          const mod = await import("./plugins/ui/mod.ts");
          const { unocss } = await import("./plugins/unocss/mod.ts");
          const { presetNetzo } = await import(
            "./plugins/unocss/preset-netzo.ts"
          );
          return [
            mod.ui(options),
            unocss({ config: { presets: [presetNetzo(options.theme)] } }),
          ];
        }
      }
    }),
  )).flat().filter((plugin) => !!plugin?.name);

  return plugins;
}
