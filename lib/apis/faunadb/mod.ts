import { createApi } from '../create-api/mod.ts'
import { auth } from '../create-api/auth/mod.ts'

/**
 * SDK constructor function for the FaunaDB API
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const faunadb = ({
  regionGroupHostname = Deno.env.get('FAUNADB_REGION_GROUP_HOSTNAME') ?? '',
  username = Deno.env.get('FAUNADB_USERNAME') ?? '',
  password = Deno.env.get('FAUNADB_PASSWORD') ?? '',
}) => {
  const api = createApi({
    baseUrl: `"https://${regionGroupHostname}/graphql`,
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({ type: 'basic', username, password }, ctx)
    },
  })

  return { api }
}
