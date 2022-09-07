import type {
  IClient,
  IClientOptions,
  INetzo,
  INetzoOptions,
} from "./types.ts";
import { createClientHTTP } from "./http/mod.ts";
import { createClientOpenAPI } from "./openapi/mod.ts";

/**
 * Constructor function for the Netzo Web SDK.
 *
 * This is the main entry point for the Netzo Web SDK. It is used to create
 * a new instance of the SDK. It handles authentication internaly.
 *
 * @example const netzo = new Netzo(API_KEY)
 *
 * @param {Object} options - The options to use for the SDK.
 * @param {string} options.apiKey - The API key to use for authentication.
 * @param {string} options.url - The URL to use for the API.
 *
 * @returns {INetzo} - A new instance of the Netzo Web SDK
 */
export const Netzo = async (options: INetzoOptions): Promise<INetzo> => {
  const { apiKey, baseURL = "https://api.netzo.io" } = options;

  const http = await createClientHTTP({ apiKey, baseURL });

  const openapi = await createClientOpenAPI({ apiKey, baseURL });

  // TODO: add createClient facade to create clients by Id based on type
  const createClient = (
    options: IClientOptions
  ): IClient => {
    switch ("openapi") {
      case "http": return http;
      case "openapi": return openapi;
    }
  }

  return {
    baseURL,
    createClient,
    getApiKey: () => apiKey,
  }; // netzo
};
