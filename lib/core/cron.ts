// see https://github.com/netzo/netzo/issues/57
import type { ApiClient } from "../apis/_create-api/types.ts";

export type CronOptions = { backoffSchedule?: number[]; signal?: AbortSignal };
export type CronFn = () => void | Promise<void>;
export type CronParams = Parameters<typeof Deno.cron>

export const createCron = (_api: ApiClient): typeof Deno.cron => {
  return Deno.cron = new Proxy(Deno.cron, {
    apply(target, thisArg, argArray: CronParams) {
      const [name, schedule, opt1, opt2] = argArray
      let options: CronOptions | undefined
      let fn: CronFn

      if (typeof opt1 === 'function' && typeof opt2 !== 'function') {
        fn = opt1
        options = opt2
      }
      else if (typeof opt1 !== 'function' && typeof opt2 === 'function') {
        fn = opt2
        options = opt1
      }

      async function run(): Promise<void> {
        // const data = { name, schedule, options }
        console.time(`[cron] ${name}`)
        // TODO: api.crons.post(data) // do not await
        await fn()
        // TODO: api.crons.delete(data) // do not await
        console.timeEnd(`[cron] ${name}`)
      }

      return target.call(thisArg, name, schedule, options || {}, run)
    },
  })
}
