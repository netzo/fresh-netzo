import type { FreshConfig } from "https://deno.land/x/fresh@1.5.2/server.ts";
import { deepMerge } from "https://deno.land/std@0.204.0/collections/deep_merge.ts";
import { netzo } from "https://deno.land/x/netzo@v0.2.50/apis/netzo/mod.ts";
import { error, LOGS } from "./cli/src/console.ts";
import {
  type VisibilityOptions,
  visibilityPlugins,
} from "./visibility/plugin.ts";
import {
  type AuthenticationOptions,
  authenticationPlugins,
} from "./authentication/plugin.ts";
import { type DatabaseOptions, databasePlugins } from "./database/plugin.ts";
import { setEnvVars } from "./utils/mod.ts";
import { Project } from "netzo/cli/deps.ts";

export interface NetzoConfig extends FreshConfig {
  project: string;
  visibility?: VisibilityOptions;
  authentication?: AuthenticationOptions;
  database?: DatabaseOptions;
  [k: string]: unknown;
}

export async function defineNetzoConfig(
  config: NetzoConfig,
): Promise<NetzoConfig> {
  const NETZO_ENV = Deno.env.get("DENO_REGION") ? "production" : "development";
  const NETZO_API_KEY = Deno.env.get("NETZO_API_KEY");
  if (!NETZO_API_KEY) error(LOGS.missingApiKey);
  const NETZO_API_URL = Deno.env.get("NETZO_API_URL");
  const {
    project: NETZO_PROJECT = Deno.env.get("NETZO_PROJECT")!,
    visibility = {
      level: ["development"].includes(NETZO_ENV) ? "private" : "public",
    },
    authentication = {},
    database = {},
    plugins = [],
  } = config;

  Deno.env.set("NETZO_ENV", NETZO_ENV);
  Deno.env.set("NETZO_PROJECT", NETZO_PROJECT);
  Deno.env.set("NETZO_API_KEY", NETZO_API_KEY);
  Deno.env.set("NETZO_API_URL", NETZO_API_URL || "https://api.netzo.io");

  // TODO: inject project.config.envVarsLocal here
  // see https://github.com/netzo/app/issues/396
  // and https://github.com/netzo/netzo/issues/44
  const { api } = netzo({ apiKey: NETZO_API_KEY, baseURL: NETZO_API_URL });
  // project includes config.env.development.envVars resolved with variables
  const project = await api.projects.get<Project>({
    uid: NETZO_PROJECT,
    $limit: 1,
  }).then((result) => result?.data?.[0]);
  if (!project) error(LOGS.notFoundProject);
  const { envVars, variables } = project.config.env.development ?? {};
  setEnvVars({ ...envVars, ...variables });
  const visibilityOptions = deepMerge<VisibilityOptions>(
    visibility,
    project?.visibility ?? {},
  );
  const authenticationOptions = deepMerge<AuthenticationOptions>(
    authentication,
    project?.config?.authentication ?? {},
  );
  const databaseOptions = deepMerge<DatabaseOptions>(
    database,
    project?.config?.database ?? {},
  );

  return {
    ...config,
    plugins: [
      ...[
        ...visibilityPlugins(visibilityOptions),
        ...authenticationPlugins(authenticationOptions),
        ...databasePlugins(databaseOptions),
      ].filter((mod) => !!mod),
      ...plugins, // eventual overrides to netzo modules
    ],
  };
}
