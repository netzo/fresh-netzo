import { createApi } from '../_create-api/mod.ts'
import { auth } from '../_create-api/auth/mod.ts'

/**
 * SDK constructor function for the Plain API
 *
 * @see https://netzo.io/docs/netzo/apis/plain
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const plain = ({
  apiKey = Deno.env.get('PLAIN_API_KEY')!,
}) => {
  const api = createApi({
    baseURL: 'https://core-api.uk.plain.com/graphql/v1',
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
