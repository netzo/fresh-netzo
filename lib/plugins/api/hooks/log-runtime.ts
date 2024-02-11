import { HookContext, NextFunction } from "../../../deps/@feathersjs/hooks.ts";

export const logRuntime = async (ctx: HookContext, next: NextFunction) => {
  console.log(ctx);
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  console.log(`[api] ${duration}ms`);
};
