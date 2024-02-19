import { defineHook, type HookContext } from "./mod.ts";

export type ResolverFn = <T>(
  data: T,
  // deno-lint-ignore no-explicit-any
  ctx: HookContext<T, any>,
  // deno-lint-ignore no-explicit-any
) => Promise<any> | any;

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

    // deno-lint-ignore no-explicit-any
    async function resolveProperties<T = any>(
      data: T | T[],
      resolvers: ResolveOptions["before" | "after"],
    ) {
      if (Array.isArray(data)) {
        await Promise.all(data.map(async (item, index) => {
          await resolveProperties(item, resolvers);
          data[index] = item;
        }));
      } else {
        await Promise.all(
          Object.keys(resolvers).map(async (key) => {
            const value = await resolvers[key](data, ctx);
            data[key] = value;
          }),
        );
      }
    }
  });
};
