import type { NetzoSDK } from "./types.ts";
import { createClient } from "./clients/http/mod.ts";
import { createService } from "./service/mod.ts";

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
  const { apiKey, baseURL = "https://api.netzo.io" } = options;

  const api = createClient({ baseURL, headers: { "x-api-key": apiKey } });

  return {
    api,
    baseURL,
    getApiKey: () => apiKey,
    service: createService(api),
    clients: {
      http: { createClient },
    },
  };
};
