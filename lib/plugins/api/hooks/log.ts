import { defineHook } from "./mod.ts";

export const log = () => {
  return defineHook(async (ctx, next) => {
    const start = new Date();
    await next();
    const duration = Date.now() - start.getTime();
    const ts = start.toTimeString().slice(0, 8);
    console.log(`${ts} ${ctx.name}::${ctx.method} ${duration}ms`);
  });
};
