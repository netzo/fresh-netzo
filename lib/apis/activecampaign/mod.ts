import { createApi } from '../create-api/mod.ts'
import { auth } from '../create-api/auth/mod.ts'

/**
 * SDK constructor function for the ActiveCampaign API
 *
 * @param {string} accountName - the account name to construct the base URL
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const activecampaign = ({
  accountName = Deno.env.get('ACTIVECAMPAIGN_ACCOUNT_NAME'),
  apiKey = Deno.env.get('ACTIVECAMPAIGN_API_KEY'),
}) => {
  const api = createApi({
    baseURL: `https://${accountName}.api-us1.com/api/3`,
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({
        type: 'apiKey',
        in: 'header',
        name: 'Api-Token',
        value: apiKey,
      }, ctx)
    },
  })

  return { api }
}
