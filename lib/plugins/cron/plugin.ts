import type { Plugin } from "../../deps/$fresh/server.ts";
import type { NetzoState } from "../mod.ts";
import { proxyCron } from "./mod.ts";

// deno-lint-ignore ban-types
export type CronConfig = {};

// deno-lint-ignore ban-types
export type CronState = {};

/**
 * Plugin to register monitoring for Deno.cron jobs.
 */
export const cron = (options?: CronConfig): Plugin<NetzoState> => {
  if (!options) return { name: "cron" };

  Deno.cron = proxyCron(kv); // proxy cron primitive

  return { name: "cron" };
};
