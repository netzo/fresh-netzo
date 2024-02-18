import type { ZodSchema } from "../../../deps/zod/mod.ts";
import { BadRequest } from "../errors.ts";
import { defineHook } from "./mod.ts";

/**
 * A hook that validates the request data using the provided Zod schema.
 *
 * @param schema {ZodSchema} - the Zod schema to validate the request data
 * @returns a hook function
 */
export const validate = (schema: ZodSchema) => {
  return defineHook(async (ctx, next) => {
    const result = schema.safeParse(ctx.data);
    if (!result.success) {
      ctx.error = result.error;
      const error = new BadRequest(result.error);
      console.error(error);
      throw error;
    }
    await next();
  });
};
