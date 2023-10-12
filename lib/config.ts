import type {
  Plugin,
  StartOptions,
} from "https://deno.land/x/fresh@1.5.1/server.ts";
import appLayout, { type AppLayoutOptions } from "./modules/appLayout/mod.ts";
import daisyui, { type DaisyuiOptions } from "./modules/daisyui/mod.ts";
import errorPages, {
  type ErrorPagesOptions,
} from "./modules/errorPages/mod.ts";
import flowbite, { type FlowbiteOptions } from "./modules/flowbite/mod.ts";
import htmx, { type HtmxOptions } from "./modules/htmx/mod.ts";
import oauth, { type OauthOptions } from "./modules/oauth/mod.ts";
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
    daisyui?: DaisyuiOptions;
    errorPages?: ErrorPagesOptions;
    flowbite?: FlowbiteOptions;
    htmx?: HtmxOptions;
    oauth?: OauthOptions;
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
        modules?.daisyui && daisyui(modules.daisyui),
        modules?.errorPages && errorPages(modules.errorPages),
        modules?.flowbite && flowbite(modules.flowbite),
        modules?.htmx && htmx(modules.htmx),
        modules?.oauth && oauth(modules.oauth),
        modules?.restdb && restdb(modules.restdb),
        modules?.unocss && unocss(modules.unocss),
      ].filter((mod) => !!mod),
    ] as NetzoModule[],
  };
}
