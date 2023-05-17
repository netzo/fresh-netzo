import { createApi } from '../create-api/mod.ts'
import { auth } from '../create-api/auth/mod.ts'

/**
 * SDK constructor function for the Google Sheets API
 *
 * @param {string} spreadsheetId - the spreadsheet ID to construct the base URL
 * @param {string} clientId - the client ID to use for authentication
 * @param {string} clientSecret - the client secret to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const googlesheets = ({
  spreadsheetId = Deno.env.get('GOOGLESHEETS_SPREADSHEET_ID') ?? '',
  clientId = Deno.env.get('GOOGLESHEETS_CLIENT_ID') ?? '',
  clientSecret = Deno.env.get('GOOGLESHEETS_CLIENT_SECRET') ?? '',
}) => {
  const api = createApi({
    baseURL: `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`,
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({
        type: 'oauth2',
        'grantType': 'authorization_code',
        'headerPrefix': 'Bearer',
        clientId,
        clientSecret,
        redirectUrl: 'https://developers.google.com/oauthplayground',
        authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        accessTokenUrl: 'https://oauth2.googleapis.com/token',
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        state: '',
      }, ctx)
    },
  })

  return { api }
}
