import type { FreshConfig } from "$fresh/src/server/mod.ts";
import { netzo } from "../apis/netzo/mod.ts";
import { error, log, LOGS } from "../utils/console.ts";
import { setEnvVars } from "../utils/mod.ts";
import { Project } from "https://esm.sh/@netzo/api@1.0.52/lib/client.d.ts";
import { AccessState } from "netzo/plugins/access/mod.ts";
import { ApiState } from "netzo/plugins/api/mod.ts";
import { PortalState } from "netzo/plugins/portal/mod.ts";

export type NetzoConfig = FreshConfig & {
  entrypoint?: string;
  importMap?: string;
  denoLock?: string;
  database?: string | {
    development?: string;
    // preview?: string;
    production?: string;
  };
  [k: string]: unknown;
};

export type NetzoState = {
  kv: Deno.Kv;
  access?: AccessState;
  api?: ApiState;
  portal?: PortalState;
  [k: string]: unknown;
};

if (import.meta.main) await defineNetzoConfig({}); // allow running as script

// WORKAROUND: until resolution of https://github.com/denoland/fresh/issues/1773#issuecomment-1763502518
const origConsoleError = console.error;
console.error = (msg) => {
  if (typeof msg === "string" && msg.includes("Improper nesting of table")) {
    return;
  }
  origConsoleError(msg);
};

export async function defineNetzoConfig(
  partialConfig: Partial<NetzoConfig>,
): Promise<Required<NetzoConfig>> {
  if (Deno.args[0] === "build") return partialConfig as Required<NetzoConfig>;

  const {
    NETZO_ENV = Deno.env.get("DENO_REGION") ? "production" : "development",
    NETZO_PROJECT_ID,
    NETZO_API_KEY,
    NETZO_API_URL,
  } = Deno.env.toObject();
  const { plugins = [] } = partialConfig;

  if (!NETZO_PROJECT_ID) error(LOGS.missingProjectId);
  if (!NETZO_API_KEY) error(LOGS.missingApiKey);

  Deno.env.set("NETZO_ENV", NETZO_ENV);
  Deno.env.set("NETZO_PROJECT_ID", NETZO_PROJECT_ID);
  Deno.env.set("NETZO_API_KEY", NETZO_API_KEY);
  Deno.env.set("NETZO_API_URL", NETZO_API_URL);

  const { api } = netzo({ apiKey: NETZO_API_KEY, baseURL: NETZO_API_URL });

  const project = await api.projects[NETZO_PROJECT_ID].get<Project>();
  if (!project) error(LOGS.notFoundProject);

  if (["development"].includes(NETZO_ENV)) {
    setEnvVars(project.envVars?.development ?? {});
  }

  const appUrl = Deno.env.get("NETZO_APP_URL") ?? "https://app.netzo.io";
  log(
    `Open in netzo at ${appUrl}/workspaces/${project.workspaceId}/projects/${project._id}`,
  );

  const state: NetzoState = {
    kv: await Deno.openKv(),
    access: project?.access ?? {},
    api: project?.api ?? {},
    portal: project?.portal ?? {},
  };

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
      ...plugins,
    ],
  };
}
