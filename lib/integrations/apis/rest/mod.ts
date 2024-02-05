import { createApi } from "../_create-api/mod.ts";

export type RestOptions = Parameters<typeof createApi>[0];

/**
 * Factory function for REST APIs
 *
 * @see https://netzo.io/docs/modules/integrations/apis/rest
 *
 * @param {string} options - the configuration for the API
 * @returns {object} - an API client instance
 */
export const rest = (options: RestOptions) => {
  const api = createApi(options);

  return api;
};
