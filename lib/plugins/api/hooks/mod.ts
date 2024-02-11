import { Middleware } from "../../../deps/@feathersjs/hooks.ts";

export * from "../../../deps/@feathersjs/hooks.ts";

// deno-lint-ignore no-explicit-any
export const defineHook = <T = any>(fn: Middleware<T>) => {
  return fn;
};
