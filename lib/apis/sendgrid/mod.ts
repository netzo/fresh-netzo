import { createApi } from '../create-api/mod.ts'
import { auth } from '../create-api/auth/mod.ts'

/**
 * SDK constructor function for the Sendgrid API
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const sendgrid = ({
  apiKey = Deno.env.get('SENDGRID_API_KEY'),
}) => {
  const api = createApi({
    baseURL: 'https://api.sendgrid.com/v3',
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        value: `Bearer ${apiKey}`,
      }, ctx)
    },
  })

  return { api }
}
