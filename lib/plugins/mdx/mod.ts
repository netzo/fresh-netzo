import type { Plugin, PluginRoute } from "../../deps/$fresh/server.ts";
import type { NetzoState } from "../../mod.ts";
import { mdxPathsToRoutes, scanForMDXFiles } from "./utils.ts";

export type MdxConfig = {
  configLocation: string;
};

// deno-lint-ignore ban-types
export type MdxState = {};

/**
 * Plugin to register monitoring for Deno.mdx jobs.
 *
 * @param {MdxConfig} - configuration options for the plugin
 * @returns {Plugin} - a Plugin for Deno Fresh
 */
export async function mdx(config: MdxConfig): Promise<Plugin<NetzoState>> {
  const routesDir = new URL("./routes", config.configLocation).pathname;
  const mdxFiles = await scanForMDXFiles(routesDir);
  const routes: PluginRoute[] = await mdxPathsToRoutes(mdxFiles, routesDir);

  return {
    name: "mdx",
    routes,
  };
}
