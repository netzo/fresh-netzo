import { Middleware } from "../../../deps/@feathersjs/hooks.ts";

export {
  type HookContext,
  hooks,
  type Middleware,
  middleware,
  type NextFunction,
} from "../../../deps/@feathersjs/hooks.ts";

// deno-lint-ignore no-explicit-any
export const defineHook = <T = any>(fn: Middleware<T>) => {
  return fn;
};
