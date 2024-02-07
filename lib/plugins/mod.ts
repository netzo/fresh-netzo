import type { Plugin } from "../deps/$fresh/server.ts";
import { replace } from "../deps/object-replace-mustache.ts";
import { proxyConsole } from "./utils.console.ts";
import { auth, type AuthConfig, type AuthState } from "./auth/plugin.ts";
import { api, type ApiConfig, type ApiState } from "./api/plugin.ts";
import { cron, type CronConfig, type CronState } from "./cron/plugin.ts";
import { env, type EnvConfig, type EnvState } from "./env/plugin.ts";
import { ui, type UiConfig, type UiState } from "./ui/plugin.ts";

export * from "./types.ts";

export type NetzoConfig = {
  auth?: AuthConfig;
  api?: ApiConfig;
  cron?: CronConfig;
  env?: EnvConfig;
  ui?: UiConfig;
};

export type NetzoState = {
  auth?: AuthState;
  api?: ApiState;
  cron?: CronState;
  env?: EnvState;
  ui?: UiState;
};

/**
 * Plugin to bundle all Netzo plugins together for
 * convenience and to ensure registration order.
 *
 * @example import { netzo } from "netzo/plugins/mod.ts"
 * const netzo = await Netzo({ ... })
 * if (import.meta.main)netzo.start()
 *
 * @param {NetzoConfig} config - the Netzo app config object
 * @returns {object} - an object of multiple utilities core to Netzo
 */
export const netzo = async (config: NetzoConfig): Promise<Plugin<NetzoState>> => {

  // WORKAROUND: silence selected messages by substrings
  console = proxyConsole(
    `Comparison using the "!==" operator here is always true`,
    `Not implemented: ClientRequest.options.createConnection`,
    `Use of deprecated "`, // Deno 2.0 warnings (see https://github.com/denoland/fresh/issues/2276)
  );

  // [app/config] render mustache values
  config = replace(config, Deno.env.toObject());

  return {
    ...config,
    plugins: [
      // IMPORTANT: must register all plugins (even if disabled) to ensure they
      // are always bundled at build time since some might depend on others
      ...(config.env ? [await env(config.env)] : []),
      ...(config.auth ? [auth(config.auth)] : []),
      ...(config.api ? [api(config.api)] : []),
      ...(config.cron ? [cron(config.cron)] : []),
      ...(config.ui ? [ui(config.ui)] : []),
    ],
  };
};
