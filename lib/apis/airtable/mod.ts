import { createApi } from '../_create-api/mod.js'
import { auth } from '../_create-api/auth/mod.js'

/**
 * SDK constructor function for the Airtable API
 *
 * @see https://netzo.io/docs/netzo/apis/airtable
 *
 * @param {string} accountName - the account name to construct the base URL
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const airtable = ({
  baseId = Deno.env.get('AIRTABLE_BASE_ID'),
  tableIdOrName = Deno.env.get('AIRTABLE_TABLE_ID_OR_NAME'),
  apiKey = Deno.env.get('AIRTABLE_PERSONAL_ACCESS_TOKEN')!,
}) => {
  const api = createApi({
    baseURL: `https://api.airtable.com/v0/${baseId}YOUR_BASE_ID/${tableIdOrName}`,
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
