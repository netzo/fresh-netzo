import type { NetzoSDK } from './types.ts'
import { createClient } from './clients/http/mod.ts'
import { createResource } from './resource/mod.ts'

export * from "https://deno.land/x/sift@0.6.0/mod.ts";
export * from "./types.ts";
export * from "./clients/http/mod.ts";
export * from "./clients/http/types.ts";
export * from "./resource/mod.ts";
export * from "./resource/types.ts";
export * from "./utils/auth/mod.ts";
export * from "./utils/auth/types.ts";
export * from "./utils/serve-function/mod.ts";

/**
 * Constructor function for the Netzo SDK.
 *
 * This is the main entry point for the Netzo SDK. It is used to create
 * a new instance of the SDK. It handles authentication internally.
 *
 * @example const netzo = new Netzo({ apiKey: Deno.env.get('API_KEY) })
 *
 * @param {string} options.apiKey - the API key to use for authentication.
 * @param {string} options.baseURL - (optional) the base URL to use for the API.
 *
 * @returns {Netzo} - a new instance of the Netzo SDK
 */
export const Netzo: NetzoSDK = (options) => {
  const { apiKey, baseURL = 'https://api.netzo.io' } = options

  const api = createClient({ baseURL, headers: { 'x-api-key': apiKey } })

  return {
    api,
    baseURL,
    getApiKey: () => apiKey,
    resource: createResource(api),
    clients: {
      http: { createClient },
    },
  }
}
