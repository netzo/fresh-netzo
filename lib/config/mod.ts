import { StartOptions } from "$fresh/server.ts";

type NetzoModuleBase = {
  enabled: boolean;
}

interface NetzoConfigBase {
  project: string;
  modules: {
    auth?: NetzoModuleBase & {
      [k: string]: unknown;
    }
  };
  [k: string]: unknown;
}

interface NetzoConfigFresh extends NetzoConfigBase {
  fresh?: StartOptions; // allows using fresh.config
}

interface NetzoConfigHono extends NetzoConfigBase {
  hono?: unknown; // not really required by hono
}

export type NetzoConfig = NetzoConfigFresh | NetzoConfigHono;

export function defineNetzoConfig(config: NetzoConfig): NetzoConfig {
  return config;
}
