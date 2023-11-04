import type { FreshConfig } from "https​://deno.land/x/fresh​@1.5.2/server.ts";
import { netzo } from "../apis/netzo/mod.ts";
import { log, LOGS, logWarning } from "../cli/src/console.ts";
import { setEnvVars } from "../utils/mod.ts";
import { Paginated, Project } from "netzo/cli/deps.ts";

export type NetzoConfig = FreshConfig & {
  project?: string;
  entrypoint?: string;
  [k: string]: unknown;
};

export type NetzoState = {
  config: NetzoConfig;
  kv: Deno.Kv;
};

if (import.meta.main) await defineNetzoConfig({}); // allow running as script

export async function defineNetzoConfig(
  partialConfig: Partial<NetzoConfig>,
): Promise<Required<NetzoConfig>> {
  const NETZO_ENV = Deno.env.get("DENO_REGION") ? "production" : "development";
  const {
    project: NETZO_PROJECT = Deno.env.get("NETZO_PROJECT")!,
    plugins = [],
  } = partialConfig;

  Deno.env.set("NETZO_ENV", NETZO_ENV);
  Deno.env.set("NETZO_PROJECT", NETZO_PROJECT);

  if (["development"].includes(NETZO_ENV)) {
    const apiKey = Deno.env.get("NETZO_API_KEY");
    if (!apiKey) {
      logWarning(LOGS.missingApiKey);
      logWarning(LOGS.skippingLoadingOfEnvVars);
    }

    const { api } = netzo({ apiKey, baseURL: Deno.env.get("NETZO_API_URL") });

    const result = await api.projects.get<Paginated<Project>>({
      uid: NETZO_PROJECT,
      $limit: 1,
    });
    const project = result?.data?.[0] as Project;
    if (!project) logWarning(LOGS.notFoundProject);

    if (project?.envVars?.development) setEnvVars(project.envVars.development);

    const appUrl = Deno.env.get("NETZO_APP_URL") ?? "https://app.netzo.io";
    log(
      `Open in netzo at ${appUrl}/workspaces/${project.workspaceId}/projects/${project._id}`,
    );
  }

  const config: NetzoConfig = {
    ...partialConfig as NetzoConfig,
    project: NETZO_PROJECT,
  };

  return {
    ...config,
    plugins: [
      ...plugins,
    ],
  };
}
