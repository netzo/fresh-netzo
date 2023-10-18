import type {
  Plugin,
  StartOptions,
} from "https://deno.land/x/fresh@1.5.1/server.ts";
import appLayout, { type AppLayoutOptions } from "./modules/appLayout/mod.ts";
import errorPages, {
  type ErrorPagesOptions,
} from "./modules/errorPages/mod.ts";
import auth, { type AuthOptions } from "./modules/auth/mod.ts";
import restdb, { type RestdbOptions } from "./modules/restdb/mod.ts";
import unocss, { type Config as UnocssOptions } from "./modules/unocss/mod.ts";

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

export interface NetzoConfig extends StartOptions {
  project?: string;
  modules?: {
    appLayout?: AppLayoutOptions;
    errorPages?: ErrorPagesOptions;
    auth?: AuthOptions;
    restdb?: RestdbOptions;
    unocss?: UnocssOptions;
  } & { [k: string]: NetzoModule };
  [k: string]: unknown;
}

export function defineNetzoConfig(config: NetzoConfig): NetzoConfig {
  const { modules = {}, plugins = [] } = config;

  return {
    ...config,
    plugins: [
      ...plugins,
      ...[
        // custom modules as plugins:
        ...Object.entries(modules).flatMap(([_uid, mod]) => mod ?? []),
        // core modules as plugins:
        modules?.appLayout && appLayout(modules.appLayout),
        modules?.errorPages && errorPages(modules.errorPages),
        modules?.auth && auth(modules.auth),
        modules?.restdb && restdb(modules.restdb),
        modules?.unocss && unocss(modules.unocss),
      ].filter((mod) => !!mod),
    ] as NetzoModule[],
  };
}
