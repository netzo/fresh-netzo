import type { Plugin, PluginRoute } from "../../deps/$fresh/server.ts";
import type { NetzoState } from "../../mod.ts";
import { mdxPathsToRoutes, scanForMDXFiles } from "./utils.ts";

// deno-lint-ignore ban-types
export type MdxConfig = {};

// deno-lint-ignore ban-types
export type MdxState = {};

/**
 * Plugin to register monitoring for Deno.mdx jobs.
 *
 * @param {MdxConfig} - configuration options for the plugin
 * @returns {Plugin} - a Plugin for Deno Fresh
 */
export const mdx = async (_config: MdxConfig): Promise<
  Plugin<NetzoState>
> => {
  const mdxFiles = await scanForMDXFiles("routes");
  const routes: PluginRoute[] = await mdxPathsToRoutes(mdxFiles);

  return {
    name: "mdx",
    routes,
  };
};
