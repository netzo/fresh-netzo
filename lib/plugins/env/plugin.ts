import type { Plugin } from "../../deps/$fresh/server.ts";
import type { NetzoState } from "../mod.ts";
import { setEnvVarsIfRemoteProject } from "./mod.ts";

// deno-lint-ignore ban-types
export type EnvConfig = {};

// deno-lint-ignore ban-types
export type EnvState = {};

/**
 * Plugin to load remote environment variables if referencing a remote project
 * (if valid NETZO_PROJECT_ID and NETZO_API_KEY environment variables are set).
 */
export const env = async (options?: EnvConfig): Plugin<NetzoState> => {
  if (!options) return { name: "env" };

  if (!Deno.env.get("DENO_REGION")) await setEnvVarsIfRemoteProject();

  return { name: "env" };
};
