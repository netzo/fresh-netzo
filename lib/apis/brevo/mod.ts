import { createApi } from '../create-api/mod.ts'
import { auth } from '../create-api/auth/mod.ts'

/**
 * SDK constructor function for the Brevo API
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const brevo = ({
  apiKey = Deno.env.get('BREVO_API_KEY') ?? '',
}) => {
  const api = createApi({
    baseURL: 'https://api.brevo.com/v3',
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({
        type: 'apiKey',
        in: 'header',
        name: 'api-key',
        value: apiKey,
      }, ctx)
    },
  })

  return { api }
}
