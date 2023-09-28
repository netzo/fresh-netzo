import { StartOptions } from "$fresh/server.ts";

type NetzoModuleBase = {
  enabled: boolean;
}

export interface NetzoConfig {
  project: string;
  modules: {
    auth?: NetzoModuleBase & {
      [k: string]: unknown;
    }
  };
  fresh?: StartOptions; // allows using fresh.config
  hono?: unknown; // not really required by hono
  [k: string]: unknown;
}

export function defineNetzoConfig(config: NetzoConfig): NetzoConfig {
  const { auth, db } = config.modules
  const pluginsFromModules: NetzoConfig["fresh"]["plugins"] = [];

  if (auth?.enabled) {
    pluginsFromModules.push({
      name: "netzoAuth",
      middlewares: [
        { path: "/", middleware: { handler: createHandler(auth) } },
      ],
    })
  }

  if (db?.enabled) {
    pluginsFromModules.push({
      name: "netzoDB",
      middlewares: [
        { path: "/", middleware: { handler: createHandler(db) } },
      ],
    })
  }

  return {
    ...config,
    plugins: [
      ...config?.plugins,
      ...pluginsFromModules
    ]
  };
}
