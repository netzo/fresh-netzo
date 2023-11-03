import { netzo } from "../apis/netzo/mod.ts";
import { error, LOGS } from "../cli/src/console.ts";
import { setEnvVars } from "../utils/mod.ts";
import { Project } from "netzo/cli/deps.ts";
import { type NetzoConfig, configPlugin } from "./plugin.ts";

export * from "./plugin.ts";

export async function defineNetzoConfig(
  partialConfig: Partial<NetzoConfig>,
): Promise<Required<NetzoConfig>> {
  const NETZO_ENV = Deno.env.get("DENO_REGION") ? "production" : "development";
  const NETZO_API_KEY = Deno.env.get("NETZO_API_KEY");
  if (!NETZO_API_KEY) error(LOGS.missingApiKey);
  const NETZO_API_URL = Deno.env.get("NETZO_API_URL") || "https://api.netzo.io";
  const NETZO_APP_URL = Deno.env.get("NETZO_APP_URL") || "https://app.netzo.io";
  const {
    project: NETZO_PROJECT = Deno.env.get("NETZO_PROJECT")!,
    plugins = [],
  } = partialConfig;

  const { api } = netzo({ apiKey: NETZO_API_KEY, baseURL: NETZO_API_URL });

  // project includes config.envVars.development resolved with variables
  const project = await api.projects.get<Project>({
    uid: NETZO_PROJECT,
    $limit: 1,
  }).then((result) => result?.data?.[0]);
  if (!project) error(LOGS.notFoundProject);

  Deno.env.set("NETZO_ENV", NETZO_ENV);
  Deno.env.set("NETZO_PROJECT", NETZO_PROJECT);
  Deno.env.set("NETZO_PROJECT_ID", project._id);
  Deno.env.set("NETZO_API_KEY", NETZO_API_KEY);
  Deno.env.set("NETZO_API_URL", NETZO_API_URL);
  Deno.env.set("NETZO_APP_URL", NETZO_APP_URL);

  console.log(`Open in netzo at ${NETZO_APP_URL}/workspaces/${project.workspaceId}/projects/${project._id}`)

  const envVars = project?.envVars?.development ?? {};
  setEnvVars(envVars);

  const config: NetzoConfig = {
    ...partialConfig as NetzoConfig,
    project: NETZO_PROJECT,
  };

  return {
    ...config,
    plugins: [
      configPlugin(config), // must run first to set ctx.state to NetzoState
      ...plugins, // eventual overrides to netzo modules
    ],
  };
}
