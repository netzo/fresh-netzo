import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";

/**
 * SDK constructor function for the Airtable API
 *
 * @see https://netzo.io/docs/netzo/apis/airtable
 *
 * @param {string} personalAccessToken - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const airtable = ({
  personalAccessToken = Deno.env.get('AIRTABLE_PERSONAL_ACCESS_TOKEN'),
}) => {
  const api = createApi({
    baseURL: `https://api.airtable.com/v0`,
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({
        type: 'bearer',
        token: personalAccessToken
      }, ctx)
    },
  })

  return { api }
}
