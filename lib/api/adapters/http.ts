import { defineService, type ServiceOptions } from "../types.ts";
import type { ApiClient } from "../../apis/_create-api/types.ts";

import { ERRORS, ulid } from "../utils.ts";

export type HttpServiceOptions = ServiceOptions & {
  /* Netzo API client of the service (e.g. api.users) */
  client: ApiClient;
};

/**
 * Creates a Service instance to perform RESTful operations on an HTTP resource
 * @param options {HttpServiceOptions} - service options object
 * @returns a Service instance with methods for performing RESTful operations on the HTTP resource
 */
export const HttpService = defineService<HttpServiceOptions>(
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
