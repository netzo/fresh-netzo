import type {
  IClient,
  IClientOptions,
  INetzo,
  INetzoOptions,
} from "./types.ts";
import { createClientHTTP } from "./http/mod.ts";
import { createClientOpenAPI } from "./openapi/mod.ts";
import { getItemUrlById } from "./utils.ts";

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

  // TODO: add createClient facade to create clients by Id based on type
  const createClientById = async (
    options: IClientOptions
  ): IClient => {
    const { apiKey, baseURL = "https://api.netzo.io" } = options;

    if (!id && !baseURL) throw new Error("No 'id' provided to as argument.");

    if (id && !baseURL) {
      const headers = { accept: "application/json", "x-api-key": apiKey };
      const response = await fetch(getItemUrlById(id), { headers });
      const item = await response.json();

      switch (item.type) {
        case "http":
          return createClientHTTP({ id, apiKey, baseURL });
        case "openapi":
          return createClientOpenAPI({ id, apiKey, baseURL });
      }
    }
  }

  return {
    baseURL,
    createClientById,
    getApiKey: () => apiKey,
  }; // netzo
};
