import type { Plugin } from "$fresh/server.ts";
import type { NetzoState } from "../../mod.ts";
import { proxyCron } from "./mod.ts";

// deno-lint-ignore ban-types
export type CronState = {};

/**
 * Plugin to register monitoring for Deno.cron jobs.
 *
 * @returns {Plugin} - a Plugin for Deno Fresh
 */
export const cron = (): Plugin<NetzoState> => {
  Deno.cron = proxyCron(); // [deno] proxy deno primitive

  return { name: "netzo.cron" };
};
