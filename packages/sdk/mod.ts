import type { NetzoSDK } from './types.ts'
import { createGetResource } from './resource/mod.ts'
import { createResourceHTTP } from './resource/http/mod.ts'

export * from 'https://deno.land/x/sift@0.6.0/mod.ts'
export * from './types.ts'
export { createResourceHTTP }

/**
 * Constructor function for the Netzo SDK.
 *
 * This is the main entry point for the Netzo SDK. It is used to create
 * a new instance of the SDK. It handles authentication internally.
 *
 * @example const netzo = new Netzo(Deno.env.get('NETZO_API_KEY))
 *
 * @param {string} apiKey - the API key to use for authentication.
 *
 * @returns {Netzo} - a new instance of the Netzo SDK
 */
export const Netzo: NetzoSDK = (apiKey: string) => {
  const api = createResourceHTTP({
    baseURL: 'https://api.netzo.io',
    headers: { 'x-api-key': apiKey ?? Deno.env.get('NETZO_API_KEY') },
  })

  return {
    api,
    getApiKey: () => apiKey,
    getResource: createGetResource(api),
  }
}
