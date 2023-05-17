import { createApi } from '../create-api/mod.ts'
import { auth } from '../create-api/auth/mod.ts'

/**
 * SDK constructor function for the Mongodb Atlas Data API
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const mongodbatlasdata = ({
  dataApiAppId = Deno.env.get('MONGODBATLASDATA_DATA_API_APP_ID') ?? '',
  apiKey = Deno.env.get('MONGODBATLASDATA_API_KEY') ?? '',
}) => {
  const api = createApi({
    baseUrl:
      `https://data.mongodb-api.com/app/${dataApiAppId}/endpoint/data/v1`,
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
