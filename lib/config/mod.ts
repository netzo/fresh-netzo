import { netzo } from "https://deno.land/x/netzo@0.2.58/apis/netzo/mod.ts";
import { error, LOGS } from "../cli/src/console.ts";
import { visibilityPlugins } from "../visibility/plugin.ts";
import { authPlugins } from "../auth/plugin.ts";
import { databasePlugins, } from "../database/plugin.ts";
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
  const NETZO_API_URL = Deno.env.get("NETZO_API_URL");
  const {
    project: NETZO_PROJECT = Deno.env.get("NETZO_PROJECT")!,
    visibility = {
      level: ["development"].includes(NETZO_ENV) ? "private" : "public",
    },
    auth = {},
    database = {},
    plugins = [],
  } = partialConfig;

  Deno.env.set("NETZO_ENV", NETZO_ENV);
  Deno.env.set("NETZO_PROJECT", NETZO_PROJECT);
  Deno.env.set("NETZO_API_KEY", NETZO_API_KEY);
  Deno.env.set("NETZO_API_URL", NETZO_API_URL || "https://api.netzo.io");

  const { api } = netzo({ apiKey: NETZO_API_KEY, baseURL: NETZO_API_URL });

  // project includes config.env.development.envVars resolved with variables
  const project = await api.projects.get<Project>({
    uid: NETZO_PROJECT,
    $limit: 1,
  }).then((result) => result?.data?.[0]);
  if (!project) error(LOGS.notFoundProject);

  console.log("project", project.name)

  const { envVars, variables } = project.config?.env?.development ?? {};
  setEnvVars({ ...envVars, ...variables });

  const config = {
    ...partialConfig,
    project: NETZO_PROJECT,
  };

  return {
    ...config,
    plugins: [
      configPlugin(config), // must run first to set ctx.state to NetzoState
      ...[
        ...visibilityPlugins(config),
        ...authPlugins(config),
        ...databasePlugins(config),
      ].filter((mod) => !!mod),
      ...plugins, // eventual overrides to netzo modules
    ],
  };
}
