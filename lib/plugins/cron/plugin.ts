import type { Plugin } from "../../deps/$fresh/server.ts";
import type { NetzoState } from "../../mod.ts";
import { proxyCron } from "./mod.ts";

export type CronConfig = {
  kv: Deno.Kv;
};

// deno-lint-ignore ban-types
export type CronState = {};

/**
 * Plugin to register monitoring for Deno.cron jobs.
 *
 * @param {CronConfig} - configuration options for the plugin
 * @returns {Plugin} - a Plugin for Deno Fresh
 */
export const cron = (config: CronConfig): Plugin<NetzoState> => {
  Deno.cron = proxyCron(config.kv); // [deno] proxy deno primitive

  return { name: "cron" };
};
