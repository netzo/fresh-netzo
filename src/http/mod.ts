import type { INetzoOptions } from "../types.ts";
import type { IClientOptionsHTTP, IClientHTTP } from "./types.ts";
import { createClient } from "./create-client.ts";
import { getItemUrlById } from "../utils.ts";

/**
 * Constructor function for the HTTP client of the Netzo Web SDK client.
 *
 * This is used to create a new HTTP client instance of the SDK.
 *
 * @example
 * const netzo = new Netzo(API_KEY)
 * const client = await netzo.http({ doc })
 *
 * @param {string} id = The ID of the Service to create a client for.
 * @param {Object} baseURL - The base URL of the API. Defaults to '/'.
 *
 * @returns {IClientHTTP} - A new instance of the Netzo Web SDK
 */
export const createClientHTTP = (
  { apiKey }: INetzoOptions
) => async ({
  id,
  baseURL = "/",
}: IClientOptionsHTTP): Promise<IClientHTTP> => {
    if (!id && !baseURL) throw new Error("Either 'id' or 'baseURL' is required");

    if (id && !baseURL) {
      const headers = { accept: "application/json", "x-api-key": apiKey };
      const response = await fetch(getItemUrlById(id), { headers });
      baseURL = await response.json();
    }

    return {
      getId: () => id,
      ...createClient({ baseURL }),
    };
  };