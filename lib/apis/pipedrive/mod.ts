import { createApi } from '../_create-api/mod.ts'
import { auth } from '../_create-api/auth/mod.ts'

/**
 * SDK constructor function for the Pipedrive API
 *
 * @see https://netzo.io/docs/netzo/apis/pipedrive
 *
 * @param {string} apiTOKEN - the API token to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const pipedrive = ({
  apiToken = Deno.env.get('PIPEDRIVE_API_TOKEN')!,
  companyDomain = Deno.env.get('PIPEDRIVE_COMPANY_DOMAIN'),
}) => {
  const api = createApi({
    baseURL: `https://${companyDomain}.pipedrive.com/v1`,
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({
        type: 'apiKey',
        in: 'query',
        name: 'api_token',
        value: apiToken,
      }, ctx)
    },
  })

  return { api }
}
