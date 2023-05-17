import { createApi } from '../create-api/mod.ts'
import { auth } from '../create-api/auth/mod.ts'

/**
 * SDK constructor function for the RestDB API
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const restdb = ({
  databaseURL = Deno.env.get('RESTDB_DATABASE_URL') ?? '',
  apiKey = Deno.env.get('RESTDB_API_KEY') ?? '',
}) => {
  const api = createApi({
    baseURL: `https://${databaseURL}.restdb.io/rest`,
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({
        type: 'apiKey',
        in: 'header',
        name: 'x-apikey',
        value: apiKey,
      }, ctx)
    },
  })

  return { api }
}
