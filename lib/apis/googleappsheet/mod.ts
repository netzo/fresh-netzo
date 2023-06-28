import { createApi } from '../create-api/mod.ts'
import { auth } from '../create-api/auth/mod.ts'

/**
 * SDK constructor function for the Google Appsheet API
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const googleappsheet = ({
  appId = Deno.env.get('GOOGLEAPPSHEET_APP_ID'),
  applicationAccessKey =
  Deno.env.get('GOOGLEAPPSHEET_APPLICATION_ACCESS_KEY'),
}) => {
  const api = createApi({
    baseURL: `https://api.appsheet.com/api/v2/apps/${appId}/tables`,
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({
        type: 'apiKey',
        in: 'header',
        name: 'ApplicationAccessKey',
        value: applicationAccessKey,
      }, ctx)
    },
  })

  return { api }
}
