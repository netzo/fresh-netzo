import { createApi } from '../_create-api/mod.ts'

/**
 * SDK constructor function for REST APIs
 *
 * @see https://netzo.io/docs/netzo/apis/rest
 *
 * @param {string} options - the configuration for the API
 * @returns {object} - an object of multiple utilities for the API
 */
export const rest = (options: Parameters<typeof createApi>[0]) => {
  const api = createApi(options)

  return { api }
}
