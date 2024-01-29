import type { HookContext, NextFunction } from "../deps/@feathersjs/hooks.ts";

export const logRuntime = async (_context: HookContext, next: NextFunction) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  console.log(`[resources] ${duration}ms`);
};
