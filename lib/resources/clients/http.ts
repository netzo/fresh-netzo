import { z, type ZodSchema } from "../../deps/zod/mod.ts";
import { defineResource } from "../mod.ts";
import type { ApiClient } from "../../apis/_create-api/types.ts";

import { ERRORS, ulid } from "../utils.ts";

export type ResourceHttpOptions = {
  /* Netzo API client of the resource (e.g. api.users) */
  client: ApiClient;
  /* Name of the field to use as the ID for the items (defaults to "id"). */
  idField?: string;
  /* Zod schema to use for validating resource items (defaults to z.unknown(). */
  schema?: ZodSchema;
};

/**
 * Creates a Resource instance to perform RESTful operations on an HTTP resource.
 * @param options {ResourceHttpOptions} - options to use when creating the resource.
 * @returns a Resource instance with methods for performing RESTful operations on the HTTP resource.
 */
export const createResourceHttp = defineResource<ResourceHttpOptions>(
  (options) => {
    const {
      client,
      idField = "id",
      schema = z.unknown(),
    } = options;

    if (!client) throw new Error(ERRORS.missingProperty("client"));
    // if (!(client is ApiClient)) throw new Error(ERRORS.invalidProperty("client"));

    type T = z.infer<typeof schema>;

    return {
      name: "http",
      options: {
        client,
        schema,
        idField,
      },
      find: (query) => {
        return client.get<T[]>(query); // native querying (if any) instead of filterObjectsByKeyValues
      },
      get: (id) => {
        return client[String(id)].get<T>();
      },
      create: async (data: T) => {
        const id = data?.[idField] ?? ulid();
        data = { [idField]: id, ...(await client[id].get()) };
        return client.post<T>(data);
      },
      update: (id, data: T) => {
        return client[String(id)].put<T>(data);
      },
      patch: (id, data: Partial<T>) => {
        return client[String(id)].patch<T>(data);
      },
      remove: async (id) => {
        await client[String(id)].delete<T>();
        return { ok: true };
      },
    };
  },
);
