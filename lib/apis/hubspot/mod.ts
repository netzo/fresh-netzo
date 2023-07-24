import { createApi } from '../_create-api/mod.ts'
import { auth } from '../_create-api/auth/mod.ts'

/**
 * SDK constructor function for the Hubspot API
 *
 * @see https://netzo.io/docs/netzo/apis/hubspot
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const hubspot = ({
  privateAppAccessToken = Deno.env.get('HUBSPOT_PRIVATE_APP_ACCESS_TOKEN')!,
}) => {
  const api = createApi({
    baseURL: 'https://api.hubspot.com',
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({
        type: 'bearer',
        token: privateAppAccessToken,
      }, ctx)
    },
  })

  return { api }
}
