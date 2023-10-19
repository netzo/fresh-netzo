import type { FreshConfig } from "https://deno.land/x/fresh@1.5.1/server.ts";
import { deepMerge } from "https://deno.land/std@0.204.0/collections/deep_merge.ts";
import { createApi } from "https://deno.land/x/netzo@v0.2.47/apis/_create-api/mod.ts";
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
  projectKey: string;
  visibility?: VisibilityOptions;
  authentication?: AuthenticationOptions;
  database?: DatabaseOptions;
  [k: string]: unknown;
}

export async function defineNetzoConfig(
  config: NetzoConfig,
): Promise<NetzoConfig> {
  const NETZO_ENV = Deno.env.get("DENO_REGION") ? "production" : "development";
  const {
    project: NETZO_PROJECT = Deno.env.get("NETZO_PROJECT")!,
    projectKey: NETZO_PROJECT_KEY = Deno.env.get("NETZO_PROJECT_KEY")!,
    visibility = {
      level: ["development"].includes(NETZO_ENV) ? "private" : "public"
    },
    authentication = {},
    database = {},
    plugins = [],
  } = config;

  Deno.env.set("NETZO_ENV", NETZO_ENV);
  Deno.env.set("NETZO_PROJECT", NETZO_PROJECT);
  Deno.env.set("NETZO_PROJECT_KEY", NETZO_PROJECT_KEY);

  // TODO: inject project.config.envVarsLocal here
  // see https://github.com/netzo/app/issues/396
  // and https://github.com/netzo/netzo/issues/44
  // NOTE:only GET /projects/:uid and PATCH /projects/:uid
  // are allowed for the projectKey auth strategy on projects
  // FIXME: replace createApi with rest client (fix type issues it was having)
  const netzo = createApi({
    baseURL: Deno.env.get("DENO_REGION")
      ? "https://api.netzo.io"
      : "http://localhost:4321",
    headers: {
      "content-type": "application/json",
      "x-project-key": projectKey,
    },
    // ignoreResponseError: true,
  });
  // project includes config.env.development.envVars resolved with variables
  const project = await netzo.projects[NETZO_PROJECT].get<Project>();
  if (project) setEnvVars(project.config.env.development.envVars);

  const visibilityOptions = deepMerge<VisibilityOptions>(
    visibility,
    project?.config?.visibility,
  );
  const authenticationOptions = deepMerge<AuthenticationOptions>(
    authentication,
    project?.config?.authentication,
  );
  const databaseOptions = deepMerge<DatabaseOptions>(
    database,
    project?.config?.database,
  );

  return {
    ...config,
    plugins: [
      ...plugins,
      ...[
        visibilityPlugin(visibilityOptions),
        authenticationPlugin(authenticationOptions),
        databasePlugin(databaseOptions),
      ].filter((mod) => !!mod),
    ],
  };
}
