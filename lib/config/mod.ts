import type { FreshConfig } from "$fresh/src/server/mod.ts";
import { netzo } from "../apis/netzo/mod.ts";
import { error, log, LOGS, logWarning } from "../utils/console.ts";
import { setEnvVars } from "../utils/mod.ts";
import { Project } from "https://esm.sh/@netzo/api@1.0.52/lib/client.d.ts";
import { PortalsState } from "netzo/plugins/portals/mod.ts";
import { ApiState } from "netzo/plugins/api/mod.ts";
import { VisibilityState } from "netzo/plugins/visibility/mod.ts";

export type NetzoConfig = FreshConfig & {
  project?: string;
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
  config: NetzoConfig;
  kv: Deno.Kv;
  api?: ApiState;
  portals?: PortalsState;
  visibility?: VisibilityState;
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
  const NETZO_ENV = Deno.env.get("DENO_REGION") ? "production" : "development";
  const {
    project: NETZO_PROJECT_ID = Deno.env.get("NETZO_PROJECT_ID")!,
    plugins = [],
  } = partialConfig;

  // if (!NETZO_PROJECT_ID) error(LOGS.missingProjectId);

  Deno.env.set("NETZO_ENV", NETZO_ENV);
  Deno.env.set("NETZO_PROJECT_ID", NETZO_PROJECT_ID);

  const isTaskBuild = Deno.args[0] === "build";

  if (["development"].includes(NETZO_ENV) && !isTaskBuild) {
    const apiKey = Deno.env.get("NETZO_API_KEY")!;
    if (!apiKey) {
      logWarning(LOGS.missingApiKey);
      logWarning(LOGS.skippingLoadingOfEnvVars);
    }

    const { api } = netzo({ apiKey, baseURL: Deno.env.get("NETZO_API_URL") });

    const project = await api.projects[NETZO_PROJECT_ID].get<Project>();
    if (!project) logWarning(LOGS.notFoundProject);

    if (project?.envVars?.development) setEnvVars(project.envVars.development);

    const appUrl = Deno.env.get("NETZO_APP_URL") ?? "https://app.netzo.io";
    log(
      `Open in netzo at ${appUrl}/workspaces/${project.workspaceId}/projects/${project._id}`,
    );
  }

  const config: NetzoConfig = {
    ...partialConfig as NetzoConfig,
    project: NETZO_PROJECT_ID,
  };

  return {
    ...config,
    plugins: [
      ...plugins,
    ],
  };
}
