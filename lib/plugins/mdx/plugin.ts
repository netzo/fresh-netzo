import type { App } from "fresh";
import type { NetzoState } from "../../mod.ts";
import { mdxPathsToRoutes, scanForMDXFiles } from "./utils.ts";

export type MdxConfig = {
  configURL: string;
};

// deno-lint-ignore ban-types
export type MdxState = {};

/**
 * Plugin to register monitoring for Deno.mdx jobs.
 */
export const mdx = async (app: App<NetzoState>, config: MdxConfig) => {
  const routesDir = new URL("./routes", config.configURL).pathname;
  const mdxFiles = await scanForMDXFiles(routesDir);
  const routes = await mdxPathsToRoutes(mdxFiles, routesDir);

  // routes:

  routes.forEach((route) => {
    app.get(route.path, (ctx) => ctx.render(route.component));
  });
};
