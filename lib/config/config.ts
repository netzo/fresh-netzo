import type {
  FreshConfig,
  Plugin,
} from "https://deno.land/x/fresh@1.5.2/server.ts";
import { netzo } from "https://deno.land/x/netzo@0.2.57/apis/netzo/mod.ts";
import { error, LOGS } from "./cli/src/console.ts";
import {
  type VisibilityOptions,
  visibilityPlugins,
  VisibilityState,
} from "./visibility/plugin.ts";
import { type AuthOptions, authPlugins, AuthState } from "./auth/plugin.ts";
import {
  type DatabaseOptions,
  databasePlugins,
  DatabaseState,
} from "./database/plugin.ts";
import { setEnvVars } from "./utils/mod.ts";
import { Project } from "netzo/cli/deps.ts";

export type NetzoConfig = FreshConfig & {
  project: string;
  entrypoint?: string;
  // modules:
  visibility: VisibilityOptions;
  auth: AuthOptions;
  database: DatabaseOptions;
  [k: string]: unknown;
};

export type NetzoState = {
  config: NetzoConfig;
  kv: Deno.Kv;
  // modules:
  visibility?: VisibilityState;
  auth?: AuthState;
  database?: DatabaseState;
};

/**
 * A fresh plugin that registers middleware to set the
 * ctx.state.config property (once) on each request.
 */
export const netzoPlugin = (config: NetzoConfig): Plugin<NetzoState> => {
  return {
    name: "netzo",
    middlewares: [
      {
        path: "/",
        middleware: {
          handler: async (_req, ctx) => {
            if (!["route"].includes(ctx.destination)) return await ctx.next();

            // TODO: connect to specific KV namespace by project.databases[0].databaseId
            // e.g. await Deno.openKv("https://api.deno.com/databases/{databaseID}/connect");
            const kv = await Deno.openKv();

            const [visibility, auth, database] = await kv.getMany([
              ["netzo", "visibility", "config"],
              ["netzo", "auth", "config"],
              ["netzo", "database", "config"],
            ]);

            ctx.state = {
              config,
              kv,
              visibility: visibility?.value ?? undefined,
              auth: auth?.value ?? undefined,
              database: database?.value ?? undefined,
            } as NetzoState;

            return await ctx.next();
          },
        },
      },
    ],
  };
};

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

  const { envVars, variables } = project.config?.env?.development ?? {};
  setEnvVars({ ...envVars, ...variables });

  const config = {
    ...partialConfig,
    project: NETZO_PROJECT,
  };

  return {
    ...config,
    plugins: [
      netzoPlugin(config), // must run first to set ctx.state to NetzoState
      ...[
        ...visibilityPlugins(config),
        ...authPlugins(config),
        ...databasePlugins(config),
      ].filter((mod) => !!mod),
      ...plugins, // eventual overrides to netzo modules
    ],
  };
}

//
