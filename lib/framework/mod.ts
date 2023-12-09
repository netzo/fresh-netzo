import type { FreshConfig } from "netzo/deps/$fresh/src/server/mod.ts";
import type { Project } from "https://esm.sh/@netzo/api@1.0.52/lib/client.d.ts";
import replace from "https://esm.sh/object-replace-mustache@1.0.2";
import { AccessState } from "netzo/framework/plugins/access/mod.ts";
// import { ApiState } from "netzo/framework/plugins/api/mod.ts";
import { PortalState } from "netzo/framework/plugins/portal/mod.ts";
import { UiState } from "netzo/framework/plugins/ui/mod.ts";
import { netzo } from "../apis/netzo/mod.ts";
import { log, logInfo, LOGS } from "../framework/utils/console.ts";
import { setEnvVars } from "../framework/utils/mod.ts";
import { bindSignal } from "netzo/framework/plugins/bindSignal/mod.ts";

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

  let state: NetzoState = {
    kv: await Deno.openKv(),
    access: project?.access ?? {},
    api: project?.api ?? {},
    portal: project?.portal ?? {},
    ui: project?.ui ?? {},
  };

  state = replace(state, { project });

  // console.log(state);

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
                // Object.entries(state).forEach(([key, value]) => {
                //   ctx.state[key] ??= value
                // });
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

async function createPlugins(state: NetzoState): Promise<Plugin[]> {
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
            "./plugins/unocss/preset-app.netzo.ts"
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
