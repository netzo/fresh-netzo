import type { Plugin } from "$fresh/server.ts";
import { type DaisyuiOptions, daisyui } from "./daisyui/mod.ts";
import { FlowbiteOptions, flowbite } from "./flowbite/mod.ts";
import { HtmxOptions, htmx } from "./htmx/mod.ts";
import { NetzoAppLayoutOptions, netzoAppLayout } from "./netzoAppLayout/mod.ts";
import { NetzoAuthOptions, netzoAuth } from "./netzoAuth/mod.ts";
import { NetzoDBOptions, netzoDB } from "./netzoDB/mod.ts";
import { NetzoErrorPagesOptions, netzoErrorPages } from "./netzoErrorPages/mod.ts";
import { Config as UnocssOptions, unocss } from "./unocss/mod.ts";

export interface NetzoOptions {
  daisyui: DaisyuiOptions;
  flowbite: FlowbiteOptions;
  htmx: HtmxOptions;
  netzoAppLayout: NetzoAppLayoutOptions;
  netzoAuth: NetzoAuthOptions;
  netzoDB: NetzoDBOptions;
  netzoErrorPages: NetzoErrorPagesOptions;
  unocss: UnocssOptions;
}

export const netzo = (options: NetzoOptions): Plugin[] => {
  const plugins: Plugin[] = [];

  if (options.daisyui) plugins.push(daisyui(options.daisyui));

  if (options.flowbite) plugins.push(flowbite(options.flowbite));

  if (options.htmx) plugins.push(htmx(options.htmx));

  if (options.netzoAppLayout) plugins.push(netzoAppLayout(options.netzoAppLayout));

  if (options.netzoAuth) plugins.push(netzoAuth(options.netzoAuth));

  if (options.netzoDB) plugins.push(netzoDB(options.netzoDB));

  if (options.netzoErrorPages) plugins.push(netzoErrorPages(options.netzoErrorPages));

  if (options.unocss) plugins.push(unocss(options.unocss));

  return plugins;
};
