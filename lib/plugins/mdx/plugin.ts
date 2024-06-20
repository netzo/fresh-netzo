import type { Plugin, PluginRoute } from "fresh/server.ts";
import type { NetzoState } from "../../mod.ts";
import { mdxPathsToRoutes, scanForMDXFiles } from "./utils.ts";

export type MdxConfig = {
  configURL: string;
};

// deno-lint-ignore ban-types
export type MdxState = {};

/**
 * Plugin to register monitoring for Deno.mdx jobs.
 *
 * @param {MdxConfig} - configuration options for the plugin
 * @returns {Plugin} - a Plugin for Deno Fresh
 */
export const mdx = async (config: MdxConfig): Promise<Plugin<NetzoState>> => {
  const routesDir = new URL("./routes", config.configURL).pathname;
  const mdxFiles = await scanForMDXFiles(routesDir);
  const routes: PluginRoute[] = await mdxPathsToRoutes(mdxFiles, routesDir);

  return {
    name: "mdx",
    routes,
  };
};
