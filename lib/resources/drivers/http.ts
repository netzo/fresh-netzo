import { z, type ZodSchema } from "../../deps/zod/mod.ts";
import { _get } from "../../deps/lodash.get.ts";
import { defineResource } from "../mod.ts";
import { ApiClient } from "../../apis/_create-api/types.ts";
import { type RestOptions } from "../../apis/rest/mod.ts";

import { ulid, ERRORS } from "../utils.ts";

export type ResourceHttpOptions = RestOptions & {
  /* The ApiClient to use. */
  api: ApiClient;
  /* The URL pathname to the resource e.g. "/accounts" or "/accounts/123/contacts" */
  pathname: string;
  /* The name of the field to use as the ID for the items. */
  idField: string;
  /* The Zod schema to use for validating resource items. */
  schema?: ZodSchema;
};

/**
 * Creates a Resource instance to perform RESTful operations on an HTTP endpoint.
 * @param options {ResourceHttpOptions} - options to use when creating the resource.
 * @returns a Resource instance with methods for performing RESTful operations on the HTTP endpoint.
 */
export const createResourceKv = defineResource<ResourceHttpOptions>((options) => {
  const {
    api,
    pathname,
    idField = "id",
    schema = z.unknown(),
  } = options;

  if (!api) throw new Error(ERRORS.missingProperty("api"));
  if (!pathname) throw new Error(ERRORS.missingProperty("pathname"));
  if (!(api instanceof Deno.Kv)) throw new Error(ERRORS.invalidProperty("api"));
  if (!Array.isArray(pathname)) throw new Error(ERRORS.invalidProperty("pathname"));

  type T = z.infer<typeof schema>;

  const pathToResource = pathname.split("/").join(".");
  const client = _get(api, pathToResource);

  return {
    name: "http",
    options: {
      api,
      pathname,
      schema,
      idField,
    },
    find: (query) => {
      return client.get<T[]>(query); // native querying (if any) instead of filterObjectsByKeyValues
    },
    get: (id) => {
      return client[id].get<T>();
    },
    create: async (data: T) => {
      const id = (data?.[idField] ?? ulid());
      data = { [idField]: id, ...(await client[id].get()) };
      return client.post<T>(data);
    },
    update: (id, data: T) => {
      return client[id].put<T>(data);
    },
    patch: (id, data: Partial<T>,) => {
      return client[id].patch<T>(data);
    },
    remove: async (id) => {
      await client[id].delete<T>();
      return { ok: true };
    },
  };
});
