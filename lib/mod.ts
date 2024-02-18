import { type FreshConfig } from "./deps/$fresh/server.ts";
import type { ApiState } from "./plugins/api/plugin.ts";
import type { AuthState } from "./plugins/auth/plugin.ts";
import type { CronState } from "./plugins/cron/plugin.ts";
import type { EnvironmentsState } from "./plugins/environments/plugin.ts";
import { proxyConsole } from "./plugins/utils.ts";

// deno-lint-ignore no-global-assign
console = proxyConsole(
  `Comparison using the "!==" operator here is always true`,
  `Not implemented: ClientRequest.options.createConnection`,
  `Use of deprecated "`, // Deno 2.0 warnings (see https://github.com/denoland/fresh/issues/2276)
); // WORKAROUND: silence selected messages by substrings

export type NetzoConfig = FreshConfig;

export type NetzoState = {
  auth?: AuthState;
  api?: ApiState;
  cron?: CronState;
  environments?: EnvironmentsState;
  [k: string]: unknown;
};

/**
 * Helper function to define a Netzo configuration object.
 *
 * Netzo is a Deno Fresh-based framework for building full-stack web apps
 * faster with less code via an opinionated set of plugins and conventions.
 *
 * @example import { defineConfig } from "netzo/mod.ts"
 * export default defineConfig({...})
 *
 * @param {NetzoConfig} config - configuration options for the application
 * @returns {object} - an application instance
 */
export function defineConfig(config: NetzoConfig) {
  return config;
}
