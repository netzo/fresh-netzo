import { defineHook } from "./mod.ts";

/**
 * A hook that converts thrown errors to corresponding HTTP error responses.
 *
 * @returns a hook function
 */
export const errors = () => {
  return defineHook(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      // TODO: convert NetzoError/Error instances to HTTP Reponses
    }
  });
};
