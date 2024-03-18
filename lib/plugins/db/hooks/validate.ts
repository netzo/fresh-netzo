import type { ZodSchema } from "../../../deps/zod/mod.ts";
import { defineHook } from "./mod.ts";

/**
 * A hook that validates data (and sets defaults) using the provided Zod schema.
 *
 * @param schema {ZodSchema} - the Zod schema to validate the data
 * @returns a hook function
 */
export const validate = (schema: ZodSchema) => {
  return defineHook(async (ctx, next) => {
    if (["create", "update", "patch"].includes(ctx.method)) {
      try {
        ctx.data = await schema.parseAsync(ctx.data);
      } catch (error) {
        ctx.error = error;
        console.error(error);
        throw new Error(error);
      }
    }
    await next();
  });
};
