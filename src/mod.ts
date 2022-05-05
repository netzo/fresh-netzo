import type {
  INetzo,
  INetzoOptions,
  IClient,
  IClientOptions,
} from "./types.ts";
import { createClient as createClientOpenapi } from "./client/mod.ts";
import { Resolver } from 'https://cdn.skypack.dev/@stoplight/json-ref-resolver';
const jsonRefResolver = new Resolver()

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
export const Netzo = (options: INetzoOptions): INetzo => {
  const { apiKey, base = "https://api.netzo.io" } = options;

  const getDocUrlById = (id: string): string => new URL(`/web/${id}`, base).href;


  /**
   * Constructor function for a Netzo Web SDK client.
   *
   * This is used to create a new client instance of the SDK.
   *
   * @example const netzo = new Netzo(API_KEY)
   *
   * @param {string} id = The ID of the Service to create a client for.
   * @param {Object} doc - The OpenApi document of the Service to create a client for.
   * @param {Callers} callers - Generic functions that handle requests at the HTTP level.
   * @param {string} origin - Defaults to specs.servers[0].url of the OpenAPI document. Optional if it's defined, else required.
   * @param {"off" | "warn" | "error"} validationLevel - Validation level (for pathParams, queryParams, and body) against the schema present in the OpenApi document.
   *
   * @returns {IClient} - A new instance of the Netzo Web SDK
   */
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
  }: IClientOptions): Promise<IClient> => {
    if (!id && !doc) throw new Error("Either 'id' or 'doc' is required");

    if (id && !doc) {
      const headers = { accept: "application/json", "x-api-key": apiKey };
      const response = await fetch(getDocUrlById(id), { headers });
      doc = await response.json();
    }

    // TODO: dereference doc in case it still has $refs
    const dereference = async (doc: any): Promise<any> => {
      const { result } = await jsonRefResolver.resolve(doc)
      return result // 'result' object is frozen (disallows mutations)
    }
    doc = await dereference(doc)

    return {
      getId: () => id,
      getDoc: () => doc,
      dereference,
      ...createClientOpenapi(doc, callers, { origin, validationLevel }),
    }; // client
  };

  return {
    base,
    getDocUrlById,
    createClient,
    getApiKey: () => apiKey,
  }; // netzo
};
