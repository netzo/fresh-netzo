// see https://github.com/netzo/netzo/issues/57
import { DenoKvService } from "../api/adapters/denokv.ts";

export type Run = {
  id: string;
  type: "cron";
  name: string;
  schedule: string | Deno.CronSchedule;
  projectId: string | undefined; // set in production
  status: "idle" | "success" | "running" | "failed";
  startedAt?: string | undefined;
  endedAt?: string | undefined;
  duration?: number | undefined;
};

export type CronOptions = { backoffSchedule?: number[]; signal?: AbortSignal };
export type CronFn = () => void | Promise<void>;
export type CronParams = Parameters<typeof Deno.cron>;

/**
 * Proxy Deno.cron to transparently integrate with Netzo
 *
 * @param db {object} - the Netzo database object (ReturnType of createDatabase factory)
 * @returns {Proxy} - a proxied Deno.cron object
 */
export const proxyCron = (kv: Deno.Kv) => {
  const $runs = DenoKvService({ kv, prefix: ["$runs"] });
  return new Proxy(Deno.cron, {
    apply(target, thisArg, argArray: CronParams) {
      const [name, schedule, opt1, opt2] = argArray;
      let options: CronOptions | undefined;
      let fn: CronFn;

      // Deno.cron(name, schedule, options, handler)
      if (typeof opt1 === "object" && typeof opt2 === "function") {
        fn = opt2;
        options = opt1;
      } // Deno.cron(name, schedule, handler)
      else if (typeof opt1 === "function") {
        fn = opt1;
      }

      async function run(): Promise<void> {
        console.time(`[cron] ${name}`);
        const startedAt = Date.now();
        const data = await $runs.create({
          type: "cron",
          name,
          schedule,
          projectId: Deno.env.get("NETZO_PROJECT_ID")!,
          status: "running",
          startedAt: new Date(startedAt).toISOString(),
          endedAt: undefined,
          duration: 0,
        }) as Run;
        try {
          await fn();
          data.status = "success";
        } catch (err) {
          console.error(`[cron] ${name} failed: ${err.message}`);
          data.status = "failed";
        } finally {
          console.timeEnd(`[cron] ${name}`);
          const endedAt = Date.now();
          data.endedAt = new Date(endedAt).toISOString();
          data.duration = endedAt - startedAt;
          await $runs.patch(data.id, data);
        }
      }

      return target.call(thisArg, name, schedule, options || {}, run);
    },
  });
};
