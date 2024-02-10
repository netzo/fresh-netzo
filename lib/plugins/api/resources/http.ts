import type { Resource, ResourceOptions } from "./mod.ts";
import type { ApiClient } from "../../../integrations/create-api/types.ts";
import { isApiClient } from "../../../integrations/create-api/utils.ts";

import { ERRORS, ulid } from "../utils.ts";

export type HttpResourceOptions = ResourceOptions & {
  /* Netzo API client of the resource (e.g. api.users) */
  client: ApiClient;
};

/**
 * Creates a Resource instance to perform RESTful operations on an HTTP resource
 * @param options {HttpResourceOptions} - resource options object
 * @returns a Resource instance with methods for performing RESTful operations on the HTTP resource
 */
export const HttpResource = <T = Record<string, unknown>>(
  options: HttpResourceOptions,
): Resource<T> => {
  const { client, idField = "id" } = options;

  if (!client) throw new Error(ERRORS.missingProperty("client"));
  if (!isApiClient(client)) throw new Error(ERRORS.invalidProperty("client"));

  return {
    type: "http",
    options: { client, idField },
    find: (query) => {
      return client.get<T[]>(query); // native querying (if any) instead of filterObjectsByKeyValues
    },
    get: (id) => {
      return client[String(id)].get<T>();
    },
    create: (data) => {
      const id = data?.[idField as keyof T] ?? ulid();
      data = { [idField]: id, ...data };
      return client.post<T>(data as Parameters<ApiClient["post"]>[0]);
    },
    update: (id, data) => {
      return client[String(id)].put<T>(data as Parameters<ApiClient["put"]>[0]);
    },
    patch: async (id, data) => {
      data = { [idField]: id, ...(await client[String(id)].get()) };
      return client[String(id)].patch<T>(data);
    },
    remove: async (id) => {
      await client[String(id)].delete<T>();
      return { ok: true };
    },
  };
};
