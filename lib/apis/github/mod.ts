import { createApi } from '../create-api/mod.ts'
import { auth } from '../create-api/auth/mod.ts'

/**
 * SDK constructor function for the GitHub API
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const github = ({
  personalAccessToken = Deno.env.get('GITHUB_PERSONAL_ACCESS_TOKEN') ?? '',
}) => {
  const api = createApi({
    baseUrl: 'https://api.github.com',
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({
        type: 'bearer',
        token: personalAccessToken,
      }, ctx)
    },
  })

  return { api }
}
