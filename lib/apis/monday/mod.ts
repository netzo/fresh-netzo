import { createApi } from '../create-api/mod.ts'
import { auth } from '../create-api/auth/mod.ts'

/**
 * SDK constructor function for the Monday API
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const monday = ({
  apiKey = Deno.env.get('MONDAY_API_KEY') ?? '',
}) => {
  const api = createApi({
    baseUrl: 'https://api.monday.com/v2',
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        value: apiKey,
      }, ctx)
    },
  })

  return { api }
}
