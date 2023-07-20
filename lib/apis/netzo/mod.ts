import { createApi } from '../_create-api/mod.ts'
import { auth } from '../_create-api/auth/mod.ts'

/**
 * SDK constructor function for the Netzo API
 *
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const netzo = ({
  apiKey = Deno.env.get('NETZO_API_KEY')!,
  baseURL = 'http://localhost:4321',
}) => {
  const api = createApi({
    baseURL,
    headers: {
      'content-type': 'application/json',
    },
    async onRequest(ctx) {
      await auth({
        type: 'apiKey',
        in: 'header',
        // heuristic to determine if apiKey (64) or envVarApiKey (128)
        name: apiKey.length === 64 ? 'x-api-key' : 'x-env-var-api-key',
        value: apiKey,
      }, ctx)
    },
  })

  const getVariable = async (uid: string): Promise<string> => {
    const result = await api.variables.get({ uid })
    return result?.data?.value
  }

  return { api, getVariable }
}
