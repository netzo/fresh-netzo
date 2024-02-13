import { defineHook, type HookContext } from "./mod.ts";

// deno-lint-ignore no-explicit-any
export type ResolverFn = (ctx: HookContext) => Promise<any> | any;

export type ResolveOptions = {
  before?: { [key: string]: ResolverFn }; // set ctx.data
  after?: { [key: string]: ResolverFn }; // set ctx.result
};

/**
 * A utility hook to resolve extra properties on the context data.
 *
 * @param resolvers An object mapping properties to (async) resolver functions.
 * @returns A hook function that resolves the specified properties in parallel.
 */
export const resolve = (options: ResolveOptions) => {
  return defineHook(async (ctx, next) => {
    if (options.before) {
      ctx.data ??= ["find"].includes(ctx.method) ? [] : {};
      await resolveProperties(ctx.data, options.before);
    }

    await next();

    if (options.after) {
      ctx.result ??= ["find"].includes(ctx.method) ? [] : {};
      await resolveProperties(ctx.result, options.after);
    }

    async function resolveProperties(
      object: any | any[],
      resolvers: ResolveOptions["before" | "after"],
    ) {
      if (Array.isArray(object)) {
        await Promise.all(object.map(async (item, index) => {
          await resolveProperties(item, resolvers);
          object[index] = item;
        }));
      } else {
        await Promise.all(
          Object.keys(resolvers).map(async (key) => {
            const value = await resolvers[key](ctx);
            console.log("resolved", key, value);
            object[key] = value;
          }),
        );
      }
    }
  });
};
