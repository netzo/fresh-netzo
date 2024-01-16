// see https://github.com/netzo/netzo/issues/57
import type { ApiClient } from "../apis/_create-api/types.ts";

export type CronOptions = { backoffSchedule?: number[]; signal?: AbortSignal };
export type CronFn = () => void | Promise<void>;
export type CronParams = Parameters<typeof Deno.cron>;

export const createCron = (api: ApiClient) => {
  return Deno.cron = new Proxy(Deno.cron, {
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

      const projectId = Deno.env.get("NETZO_PROJECT_ID")!;
      const data: Record<string, unknown> = {
        name,
        schedule,
        runs: [],
        env: Deno.env.get("NETZO_ENV")!,
        projectId,
      };
      console.log('POST data', data)
      api.crons.post(data); // do not await

      const query = { name, projectId };

      async function run(): Promise<void> {
        console.time(`[cron] ${name}`);
        const startedAt = Date.now();
        const run: Record<string, unknown> = {
          status: "running",
          startedAt: new Date(startedAt).toISOString(),
        };
        try {
          console.log('PATCH run', run)
          api.crons.patch({ runs: [run] }, query); // do not await
          await fn();
          run.status = "success";
        } catch (err) {
          console.error(`[cron] ${name} failed: ${err.message}`);
          run.status = "failed";
        } finally {
          console.timeEnd(`[cron] ${name}`);
          const endedAt = Date.now();
          run.endedAt = new Date(endedAt).toISOString();
          run.duration = endedAt - startedAt;
          console.log('PATCH 2', data)
          api.crons.patch({ runs: [run] }, query); // do not await
        }
      }

      return target.call(thisArg, name, schedule, options || {}, run);
    },
  });
};
