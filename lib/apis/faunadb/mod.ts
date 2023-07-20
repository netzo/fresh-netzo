import { createApi } from '../_create-api/mod.ts'
import { auth } from '../_create-api/auth/mod.ts'

/**
 * SDK constructor function for the FaunaDB API
 *
 * @see https://netzo.io/docs/netzo/apis/faunadb
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const faunadb = ({
  regionGroupHostname = Deno.env.get('FAUNADB_REGION_GROUP_HOSTNAME'),
  username = Deno.env.get('FAUNADB_USERNAME')!,
  password = Deno.env.get('FAUNADB_PASSWORD')!,
}) => {
  const api = createApi({
    baseURL: `"https://${regionGroupHostname}/graphql`,
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({ type: 'basic', username, password }, ctx)
    },
  })

  return { api }
}
