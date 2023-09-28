import type { StartOptions, Plugin } from "$fresh/server.ts";
import { daisyui, type DaisyuiOptions } from "./modules/daisyui/mod.ts";
import { flowbite, FlowbiteOptions } from "./modules/flowbite/mod.ts";
import { htmx, HtmxOptions } from "./modules/htmx/mod.ts";
import { appLayout, AppLayoutOptions } from "./modules/appLayout/mod.ts";
import { oauth, OauthOptions } from "./modules/oauth/mod.ts";
import { restdb, RestdbOptions } from "./modules/restdb/mod.ts";
import { errorPages, ErrorPagesOptions } from "./modules/errorPages/mod.ts";
import { Config as UnocssOptions, unocss } from "./modules/unocss/mod.ts";

// NOTE: matches Module type from @netzo/api
export interface NetzoModule extends Plugin {
  uid: string;
  name?: string;
  description?: string;
  labels?: string[];
  display?: {
    avatar?: string;
    color?: string;
  };
  status?: 'stable' | 'alpha' | 'beta' | 'soon'
}

export interface NetzoConfig extends StartOptions {
  project: string;
  modules: {
    appLayout?: AppLayoutOptions;
    daisyui?: DaisyuiOptions;
    errorPages?: ErrorPagesOptions;
    flowbite?: FlowbiteOptions;
    htmx?: HtmxOptions;
    oauth?: OauthOptions;
    restdb?: RestdbOptions;
    unocss?: UnocssOptions;
    [k: string]: NetzoModule & { [k: string]: unknown };
  };
  [k: string]: unknown;
}

export function defineNetzoConfig(config: NetzoConfig): NetzoConfig {
  const { modules = {}, plugins = [] } = config;

  return {
    ...config,
    plugins: [
      // plugins:
      ...plugins,
      // custom modules:
      ...Object.entries(modules).flatMap(([uid, mod]) => mod?.plugins ?? []),
      // core modules:
      ...(modules?.appLayout ? [appLayout(modules.appLayout)] : []),
      ...(modules?.daisyui ? [daisyui(modules.daisyui)] : []),
      ...(modules?.errorPages ? [errorPages(modules.errorPages)] : []),
      ...(modules?.flowbite ? [flowbite(modules.flowbite)] : []),
      ...(modules?.htmx ? [htmx(modules.htmx)] : []),
      ...(modules?.oauth ? [oauth(modules.oauth)] : []),
      ...(modules?.restdb ? [restdb(modules.restdb)] : []),
      ...(modules?.unocss ? [unocss(modules.unocss)] : []),
    ],
  };
}