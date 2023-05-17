import { createApi } from '../create-api/mod.ts'
import { auth } from '../create-api/auth/mod.ts'

/**
 * SDK constructor function for the PandaDoc API
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const pandadoc = ({
  apiKey = Deno.env.get('PANDADOC_API_KEY') ?? '',
}) => {
  const api = createApi({
    baseURL: 'https://api.pandadoc.com/public/v1',
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        value: `API-Key ${apiKey}`,
      }, ctx)
    },
  })

  return { api }
}
