// see https://github.com/netzo/netzo/issues/57
import type { ApiClient } from "../apis/_create-api/types.ts";

export type CronOptions = { backoffSchedule?: number[]; signal?: AbortSignal };
export type CronFn = () => void | Promise<void>;
export type CronParams = Parameters<typeof Deno.cron>;

export const createCron = (api: ApiClient): typeof Deno.cron => {
  return Deno.cron = new Proxy(Deno.cron, {
    apply(target, thisArg, argArray: CronParams) {
      const [name, schedule, opt1, opt2] = argArray;
      let options: CronOptions | undefined;
      let fn: CronFn;

      if (typeof opt1 === "function" && typeof opt2 !== "function") {
        fn = opt1;
        options = opt2;
      } else if (typeof opt1 !== "function" && typeof opt2 === "function") {
        fn = opt2;
        options = opt1;
      }

      const projectId = Deno.env.get("NETZO_PROJECT_ID")!;
      const data = { projectId, name, schedule, status: "running", duration: 0 };
      api.crons.post(data); // do not await

      const query = { name, projectId };

      async function run(): Promise<void> {
        const start = Date.now();
        try {
          console.time(`[cron] ${name}`);
          api.crons.patch(data, query); // do not await
          await fn();
          data.status = "done";
        } catch (err) {
          console.error(`[cron] ${name} failed: ${err.message}`);
          data.status = "failed";
        } finally {
          console.timeEnd(`[cron] ${name}`);
          data.duration = Date.now() - start;
          api.crons.patch(data, query); // do not await
        }
      }

      return target.call(thisArg, name, schedule, options || {}, run);
    },
  });
};
