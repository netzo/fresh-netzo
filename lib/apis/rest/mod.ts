import { createApi } from "../_create-api/mod.ts";

export type RestOptions = Parameters<typeof createApi>[0];

/**
 * SDK constructor function for REST APIs
 *
 * @see https://netzo.io/docs/framework/apis/rest
 *
 * @param {string} options - the configuration for the API
 * @returns {object} - an object of multiple utilities for the API
 */
export const rest = (options: RestOptions) => {
  const api = createApi(options);

  return api;
};
