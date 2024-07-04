import type { App } from "fresh";
import type { NetzoState } from "../../mod.ts";
import { proxyCron } from "./mod.ts";

// deno-lint-ignore ban-types
export type CronState = {};

/**
 * Plugin to register monitoring for Deno.cron jobs.
 */
export const cron = (_app: App<NetzoState>) => {
  Deno.cron = proxyCron(); // [deno] proxy deno primitive;
};
