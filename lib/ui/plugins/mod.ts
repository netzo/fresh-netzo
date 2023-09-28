import type { Plugin } from "$fresh/server.ts";
import { daisyui, type DaisyuiOptions } from "./daisyui/mod.ts";
import { flowbite, FlowbiteOptions } from "./flowbite/mod.ts";
import { htmx, HtmxOptions } from "./htmx/mod.ts";
import { appLayout, AppLayoutOptions } from "./appLayout/mod.ts";
import { netzoAuth, NetzoAuthOptions } from "./netzoAuth/mod.ts";
import { netzoDB, NetzoDBOptions } from "./netzoDB/mod.ts";
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
  netzoAuth: NetzoAuthOptions;
  netzoDB: NetzoDBOptions;
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

  if (options.netzoAuth) plugins.push(netzoAuth(options.netzoAuth));

  if (options.netzoDB) plugins.push(netzoDB(options.netzoDB));

  if (options.errorPages) {
    plugins.push(errorPages(options.errorPages));
  }

  if (options.unocss) plugins.push(unocss(options.unocss));

  return plugins;
};
