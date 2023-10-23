import type { FreshConfig } from "https://deno.land/x/fresh@1.5.2/server.ts";
import { deepMerge } from "https://deno.land/std@0.204.0/collections/deep_merge.ts";
import { netzo } from "https://deno.land/x/netzo@v0.2.50/apis/netzo/mod.ts";
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
  const { api } = netzo({ apiKey: NETZO_API_KEY });
  // project includes config.env.development.envVars resolved with variables
  const project = await api.projects.get<Project>({
    uid: NETZO_PROJECT,
    $limit: 1,
  }).then((result) => result?.data?.[0]);
  if (project) {
    const { envVars, variables } = project.config.env.development ?? {};
    setEnvVars({ ...envVars, ...variables });
  }
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

  console.log("TOKEN", Deno.env.get("TOKEN"));
  console.log("FOO", Deno.env.get("FOO"));
  console.log("LOCAL", Deno.env.get("LOCAL"));

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
