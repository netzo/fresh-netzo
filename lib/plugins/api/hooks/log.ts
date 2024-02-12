import { defineHook } from "./mod.ts";

/**
 * A hook that logs general request information to the console.
 *
 * @returns a hook function
 */
export const log = () => {
  return defineHook(async (ctx, next) => {
    const start = new Date();
    await next();
    const duration = Date.now() - start.getTime();
    const ts = start.toTimeString().slice(0, 8);
    console.log(`${ts} ${ctx.name}::${ctx.method} ${duration}ms`);
  });
};
