import type { INetzo, INetzoOptions, } from "./types.ts";
import { createClientRequestFactory } from "./utils.ts";

/**
 * Constructor function for the Netzo Web SDK.
 *
 * This is the main entry point for the Netzo Web SDK. It is used to create
 * a new instance of the SDK. It handles authentication internaly.
 *
 * @example const netzo = new Netzo(API_KEY)
 *
 * @param {string} options.apiKey - The API key to use for authentication.
 * @param {string} options.url - The URL to use for the API.
 *
 * @returns {INetzo} - A new instance of the Netzo Web SDK
 */
export const Netzo = (options: INetzoOptions): INetzo => {
  const { apiKey, baseURL = "https://api.netzo.io" } = options;

  return {
    baseURL,
    createClientRequest: createClientRequestFactory(options),
    getApiKey: () => apiKey,
  }; // netzo
};
