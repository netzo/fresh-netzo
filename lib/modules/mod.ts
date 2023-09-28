import type { Plugin } from "$fresh/server.ts";
import { daisyui, type DaisyuiOptions } from "./daisyui/mod.ts";
import { flowbite, FlowbiteOptions } from "./flowbite/mod.ts";
import { htmx, HtmxOptions } from "./htmx/mod.ts";
import { appLayout, AppLayoutOptions } from "./appLayout/mod.ts";
import { oauth, OauthOptions } from "./oauth/mod.ts";
import { restdb, RestdbOptions } from "./restdb/mod.ts";
import {
  errorPages,
  ErrorPagesOptions,
} from "./errorPages/mod.ts";
import { Config as UnocssOptions, unocss } from "./unocss/mod.ts";

export interface NetzoOptions {
  daisyui: DaisyuiOptions;
  flowbite: FlowbiteOptions;
  htmx: HtmxOptions;
  appLayout: AppLayoutOptions;
  oauth: OauthOptions;
  restdb: RestdbOptions;
  errorPages: ErrorPagesOptions;
  unocss: UnocssOptions;
}

export const netzo = (options: NetzoOptions): Plugin[] => {
  const plugins: Plugin[] = [];

  if (options.daisyui) plugins.push(daisyui(options.daisyui));

  if (options.flowbite) plugins.push(flowbite(options.flowbite));

  if (options.htmx) plugins.push(htmx(options.htmx));

  if (options.appLayout) {
    plugins.push(appLayout(options.appLayout));
  }

  if (options.oauth) plugins.push(oauth(options.oauth));

  if (options.restdb) plugins.push(restdb(options.restdb));

  if (options.errorPages) {
    plugins.push(errorPages(options.errorPages));
  }

  if (options.unocss) plugins.push(unocss(options.unocss));

  return plugins;
};
