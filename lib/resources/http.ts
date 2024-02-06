import { defineResource, type ResourceOptions } from "../core/api/types.ts";
import type { ApiClient } from "../integrations/create-api/types.ts";

import { ERRORS, ulid } from "../core/api/utils.ts";

export type HttpResourceOptions = ResourceOptions & {
  /* Netzo API client of the resource (e.g. api.users) */
  client: ApiClient;
};

/**
 * Creates a Resource instance to perform RESTful operations on an HTTP resource
 * @param options {HttpResourceOptions} - resource options object
 * @returns a Resource instance with methods for performing RESTful operations on the HTTP resource
 */
export const HttpResource = defineResource<HttpResourceOptions>(
  (options) => {
    const { client, idField = "id" } = options;

    if (!client) throw new Error(ERRORS.missingProperty("client"));
    // if (!(client is ApiClient)) throw new Error(ERRORS.invalidProperty("client"));

    return {
      adapter: "http",
      options: {
        client,
        idField,
      },
      find: (query) => {
        return client.get<T[]>(query); // native querying (if any) instead of filterObjectsByKeyValues
      },
      get: (id) => {
        return client[String(id)].get<T>();
      },
      create: (data: T) => {
        const id = data?.[idField] ?? ulid();
        data = { [idField]: id, ...data };
        return client.post<T>(data);
      },
      update: (id, data: T) => {
        return client[String(id)].put<T>(data);
      },
      patch: async (id, data: Partial<T>) => {
        data = { [idField]: id, ...(await client[String(id)].get()) };
        return client[String(id)].patch<T>(data);
      },
      remove: async (id) => {
        await client[String(id)].delete<T>();
        return { ok: true };
      },
    };
  },
);
