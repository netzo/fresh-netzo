import { createApi } from '../_create-api/mod.ts'
import { auth } from '../_create-api/auth/mod.ts'

/**
 * SDK constructor function for the PurpleAir API
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const purpleair = ({
  apiKey = Deno.env.get('PURPLEAIR_API_KEY')!,
}) => {
  const api = createApi({
    baseURL: 'https://api.purpleair.com/v1',
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
        value: apiKey,
      }, ctx)
    },
  })

  return { api }
}
