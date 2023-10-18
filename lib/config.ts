import type {
  Plugin,
  FreshConfig,
} from "https://deno.land/x/fresh@1.5.1/server.ts";
import authentication, {
  type AuthenticationOptions,
} from "./authentication/mod.ts";
import database, { type DatabaseOptions } from "./database/plugin/mod.ts";

// NOTE: extends Module (from @netzo/api) with Plugin
export interface NetzoModule extends Plugin {
  description?: string;
  labels?: string[];
  display?: {
    avatar?: string;
    color?: string;
  };
  status?: "stable" | "alpha" | "beta" | "soon";
}

export interface NetzoConfig extends FreshConfig {
  project?: string;
  modules?: {
    authentication?: AuthenticationOptions;
    database?: DatabaseOptions;
  };
  [k: string]: unknown;
}

export function defineNetzoConfig(config: NetzoConfig): NetzoConfig {
  const { modules = {}, plugins = [] } = config;

  // TODO: inject project.config.envVarsLocal here
  // see https://github.com/netzo/app/issues/396
  // and https://github.com/netzo/netzo/issues/44

  return {
    ...config,
    plugins: [
      ...plugins,
      ...[
        // modules as plugins:
        modules?.authentication && authentication(modules.authentication),
        modules?.database && database(modules.database),
      ].filter((mod) => !!mod),
    ] as NetzoModule[],
  };
}
