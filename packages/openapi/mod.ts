import { Resolver } from "https://cdn.skypack.dev/@stoplight/json-ref-resolver";
import type { INetzoOptions } from "../types.ts";
import type { IClientOptionsOpenapi, IClientOpenapi } from "./types.ts";
import { createClient } from "./create-client/mod.ts";
import { getItemUrlById } from "../utils.ts";

/**
 * Constructor function for the OpenAPI client of the Netzo Web SDK client.
 *
 * @example
 * const netzo = new Netzo(API_KEY)
 * const client = await netzo.openapi({ doc })
 *
 * @param {string} id = The ID of the Service to create a client for.
 * @param {Object} doc - The OpenApi document of the Service to create a client for.
 * @param {Callers} callers - Generic functions that handle requests at the HTTP level.
 * @param {string} origin - Defaults to specs.servers[0].url of the OpenAPI document. Optional if it's defined, else required.
 * @param {"off" | "warn" | "error"} validationLevel - Validation level (for pathParams, queryParams, and body) against the schema present in the OpenApi document.
 *
 * @returns {IClientOpenapi} - A new instance of the Netzo Web SDK
 */
export const createClientOpenAPI = (
  { apiKey }: INetzoOptions
) => async ({
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
}: IClientOptionsOpenapi): Promise<IClientOpenapi> => {
    if (!id && !doc) throw new Error("Either 'id' or 'doc' is required");

    if (id && !doc) {
      const headers = { accept: "application/json", "x-api-key": apiKey };
      const response = await fetch(getItemUrlById(id), { headers });
      doc = await response.json();
    }

    // TODO: dereference doc in case it still has $refs
    const dereference = async (doc: any): Promise<any> => {
      const jsonRefResolver = new Resolver();
      const { result } = await jsonRefResolver.resolve(doc);
      return result; // 'result' object is frozen (disallows mutations)
    };
    doc = await dereference(doc);

    return {
      getId: () => id,
      getDoc: () => doc,
      dereference,
      ...createClient(doc, callers, { origin, validationLevel }),
    };
  };