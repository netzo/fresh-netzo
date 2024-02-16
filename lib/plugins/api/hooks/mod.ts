import { Middleware } from "../../../deps/@feathersjs/hooks.ts";

export {
  hooks, middleware, type HookContext, type Middleware, type NextFunction
} from "../../../deps/@feathersjs/hooks.ts";

export * from "./authenticate.ts";
export * from "./log.ts";
export * from "./resolve.ts";
export * from "./validate.ts";

// deno-lint-ignore no-explicit-any
export const defineHook = <T = any>(fn: Middleware<T>) => {
  return fn;
};
