// see https://github.com/netzo/netzo/issues/57
import type { createDatabase } from "../../framework/database.ts";

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

export const proxyCron = (db: ReturnType<typeof createDatabase>) => {
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
        const data = await db.create<Run>(["$runs"], {
          type: "cron",
          name,
          schedule,
          projectId: Deno.env.get("NETZO_PROJECT_ID")!,
          status: "running",
          startedAt: new Date(startedAt).toISOString(),
          endedAt: undefined,
          duration: 0,
        } as Run); // do not await
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
          await db.patch(["$runs", data.id], data); // do not await
        }
      }

      return target.call(thisArg, name, schedule, options || {}, run);
    },
  });
};
