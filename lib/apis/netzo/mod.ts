import type { Variable } from 'https://esm.sh/@netzo/api@1.0.10'
import { createApi } from '../create-api/mod.ts'

/**
 * Constructor function for a minimal, type-safe client of the Netzo API.
 *
 * @example const netzo = new Netzo(Deno.env.get('NETZO_API_KEY))
 * @param {string} apiKey - the API key to use for authentication.
 * @returns {Netzo} - a new instance of the Netzo SDK
 */
export const netzo = ({ apiKey = Deno.env.get('NETZO_API_KEY') || '' }) => {
  const api = createApi({
    baseURL: 'https://api.netzo.io',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey ?? Deno.env.get('NETZO_API_KEY'),
    },
  })

  const getVariable = async (uid: string): Promise<Variable['value']> => {
    const result = await api.variables.get({ uid })
    return result?.data?.value
  }

  return { api, getVariable }
}
