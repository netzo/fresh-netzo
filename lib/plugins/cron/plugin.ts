import type { Plugin } from "../../deps/$fresh/server.ts";
import { proxyCron } from "./mod.ts";

export type CronConfig = {
  kv: Deno.Kv;
};

// deno-lint-ignore ban-types
export type CronState = {};

/**
 * Plugin to register monitoring for Deno.cron jobs.
 */
export const cron = (options?: CronConfig): Plugin => {
  if (!options) return { name: "cron" };

  Deno.cron = proxyCron(options.kv); // [deno] proxy deno primitive

  return { name: "cron" };
};
