import { defineHook } from "./mod.ts";

export const logRuntime = defineHook(async (ctx, next) => {
  console.log(ctx);
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  console.log(`[api] ${duration}ms`);
});
