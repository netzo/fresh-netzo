import { z, type ZodSchema } from "../../deps/zod/mod.ts";
import { defineResource } from "../mod.ts";
import { ulid, ERRORS } from "../utils.ts";
import { filterObjectsByKeyValues } from "../../utils/mod.ts";

export type ResourceKvOptions = {
  /* The Deno KV store to use. */
  kv: Deno.Kv;
  /* The KV prefix location of the resource e.g. ["accounts"], ["accounts", "123", "contacts"] */
  prefix?: Deno.KvKey;
  /* The name of the field to use as the ID for the items. */
  idField: string;
  /* The Zod schema to use for validating resource items. */
  schema?: ZodSchema;
};

/**
 * Creates a Resource instance to perform RESTful operations on a Deno KV store.
 * @param options {ResourceKvOptions} - options to use when creating the resource.
 * @returns a Resource instance with methods for performing RESTful operations on the KV store.
 */
export const createResourceKv = defineResource<ResourceKvOptions>((options) => {
  const {
    kv,
    prefix,
    idField = "id",
    schema = z.unknown(),
  } = options;

  if (!kv) throw new Error(ERRORS.missingProperty("kv"));
  if (!prefix) throw new Error(ERRORS.missingProperty("prefix"));
  if (!(kv instanceof Deno.Kv)) throw new Error(ERRORS.invalidProperty("kv"));
  if (!Array.isArray(prefix)) throw new Error(ERRORS.invalidProperty("prefix"));

  type T = z.infer<typeof schema>;

  return {
    name: "kv",
    options: {
      kv,
      prefix,
      schema,
      idField,
    },
    find: async (query) => {
      const data = (await Array.fromAsync(
        kv.list<T>({ prefix }),
      )).map((res) => res.value) as T[];
      return query ? filterObjectsByKeyValues<T>(data, query) : data;
    },
    get: async (id: Deno.KvKeyPart) => {
      const key = [...prefix, id];
      return (await kv.get<T>(key)).value;
    },
    create: async (data: T) => {
      const id = (data?.[idField] ?? ulid()) as Deno.KvKeyPart;
      const key = [...prefix, id];
      data = { [idField]: id, ...data };
      const ok = await kv.atomic().set(key, data).commit();
      if (!ok) throw new Error("Something went wrong.");
      return data;
    },
    update: async (id: Deno.KvKeyPart, data: T) => {
      const key = [...prefix, id];
      const entry = await kv.get<T>(key);
      if (!entry.value) throw new Error(`Record with id ${JSON.stringify(key)} not found.`);
      const ok = await kv.atomic().check(entry).set(key, data).commit();
      if (!ok) throw new Error("Something went wrong.");
      return data;
    },
    patch: async (
      id: Deno.KvKeyPart,
      data: Partial<T>,
    ) => {
      const key = [...prefix, id];
      const entry = await kv.get<T>(key);
      if (!entry.value) throw new Error(`Record with id ${JSON.stringify(key)} not found.`);
      data = { ...entry.value, ...data };
      const ok = await kv.atomic().check(entry).set(key, data).commit();
      if (!ok) throw new Error("Something went wrong.");
      return data;
    },
    remove: async (id: Deno.KvKeyPart) => {
      const key = [...prefix, id];
      await kv.delete(key);
      return { ok: true };
    },
  };
});
