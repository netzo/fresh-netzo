import type {
  INetzo,
  INetzoOptions,
  IService,
  IServiceOptions,
} from "./types.ts";
import { createClient as createClientOpenapi } from "./client/mod.ts";
import { Callers, ValidationLevel } from "./client/types.ts";

/**
 * Constructor function for the Netzo SDK.
 *
 * This is the main entry point for the Netzo SDK. It is used to create
 * a new instance of the SDK. It handles authentication internaly.
 *
 * follow https://deno.land/manual/contributing/style_guide
 *
 * @example const netzo = new Netzo(API_KEY)
 *
 * @param {Object} options - The options to use for the SDK.
 * @param {string} options.apiKey - The API key to use for authentication.
 * @param {string} options.url - The URL to use for the API.
 *
 * @returns {Netzo} - A new instance of the Netzo SDK
 */
export const Netzo = (options: INetzoOptions): INetzo => {
  const { apiKey, apiUrl = "https://api.netzo.io" } = options;

  const createClient = async ({
    id,
    doc,
    callers = {
      get: async (url) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("x-api-key", apiKey);
        const resp = await fetch(url, { headers });
        const json = await resp.json();
        return json;
      },
      post: async (url, body) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("x-api-key", apiKey);
        const resp = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        });
        const json = await resp.json();
        return json;
      },
    },
    origin = null,
    validationLevel = "error",
  }: IServiceOptions): Promise<IService> => {
    if (!id && !doc) throw new Error("Either 'id' or 'doc' is required");

    const getUrl = () => `${apiUrl}/web/${id}`;

    if (id && !doc) {
      const headers = { accept: "application/json", "x-api-key": apiKey };
      const response = await fetch(getUrl(), { headers });
      doc = await response.json();
    }

    return {
      ...createClientOpenapi(doc, callers, { origin, validationLevel }),
      getUrl,
      getDoc: () => doc,
    };
  };

  return {
    createClient,
    getApiKey: () => apiKey,
  };
};
