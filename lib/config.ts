import type { FreshConfig } from "https://deno.land/x/fresh@1.5.1/server.ts";
import { deepMerge } from "https://deno.land/std@0.204.0/collections/deep_merge.ts";
import { netzo } from "https://deno.land/x/netzo@v0.2.47/apis/netzo/mod.ts";
import { error, LOGS } from "./cli/src/console.ts";
import {
  type VisibilityOptions,
  visibilityPlugin,
} from "./visibility/fresh.ts";
import {
  type AuthenticationOptions,
  authenticationPlugin,
} from "./authentication/fresh.ts";
import { type DatabaseOptions, databasePlugin } from "./database/fresh.ts";
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

  // TODO: inject project.config.envVarsLocal here
  // see https://github.com/netzo/app/issues/396
  // and https://github.com/netzo/netzo/issues/44
  const { api } = netzo({
    apiKey: NETZO_API_KEY,
    baseURL: Deno.env.get("DENO_REGION")
      ? "https://api.netzo.io"
      : "http://localhost:4321",
  });
  // project includes config.env.development.envVars resolved with variables
  const { data: [project] } = await api.projects.get<Project>({
    uid: NETZO_PROJECT,
    $limit: 1,
  });
  if (project) setEnvVars(project.config.env.development.envVars);
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
        visibilityPlugin(visibilityOptions),
        authenticationPlugin(authenticationOptions),
        databasePlugin(databaseOptions),
      ].filter((mod) => !!mod),
      ...plugins, // eventual overrides to netzo modules
    ],
  };
}
