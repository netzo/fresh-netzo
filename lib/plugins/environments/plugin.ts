import type { Plugin } from "../../deps/$fresh/server.ts";
import type { NetzoState } from "../../mod.ts";
import { setEnvVarsIfRemoteProject } from "./mod.ts";

export type EnvironmentsConfig = {
  kv: Deno.Kv;
};

// deno-lint-ignore ban-types
export type EnvironmentsState = {};

/**
 * Plugin to load development envVars if referencing a remote project.
 * (Runs if NETZO_PROJECT_ID environment variable is set and valid).
 *
 * @param {EnvironmentsConfig} - configuration options for the plugin
 * @returns {Plugin} - a Plugin for Deno Fresh
 */
export const environments = (
  options?: EnvironmentsConfig,
): Plugin<NetzoState> => {
  if (!options) return { name: "environments" };

  return {
    name: "environments",
    configResolved: async (_config) => {
      if (!Deno.env.get("DENO_REGION")) await setEnvVarsIfRemoteProject();
    },
  };
};
