import { ERRORS, filterObjectsByKeyValues, ulid } from "../utils.ts";
import type { Resource, ResourceOptions } from "./mod.ts";

export const KV = await Deno.openKv();

export type DenoKvResourceOptions = ResourceOptions & {
  /* The KV prefix location of the resource e.g. ["users"] */
  prefix: Deno.KvKey;
  /* The Deno KV store to use (defaults to default database via Deno.openKv()).
  Note that for in-memory storage you can use Deno.openKv(":memory:") */
  kv?: Deno.Kv;
};

/**
 * Creates a Resource instance to perform RESTful operations on a Deno KV resource
 * @param options {DenoKvResourceOptions} - resource options object
 * @returns a Resource instance for performing RESTful operations on the KV resource
 */
export const DenoKvResource = <T = Record<string, unknown>>(
  options: DenoKvResourceOptions,
): Resource<T> => {
  const { kv = KV, prefix, idField = "id" } = options;

  if (!kv) throw new Error(ERRORS.missingProperty("kv"));
  if (!prefix) throw new Error(ERRORS.missingProperty("prefix"));
  if (!(kv instanceof Deno.Kv)) throw new Error(ERRORS.invalidProperty("kv"));
  if (!Array.isArray(prefix)) {
    throw new Error(ERRORS.invalidProperty("prefix"));
  }

  return {
    type: "denokv",
    options: { kv, prefix, idField },
    find: async (query) => {
      const data = (await Array.fromAsync(
        kv.list<T>({ prefix }),
      )).map((res) => res.value) as T[];
      return query ? filterObjectsByKeyValues<T>(data, query) : data;
    },
    get: async (id) => {
      const key = [...prefix, id];
      const { value } = await kv.get<T>(key);
      return value === null ? undefined : value;
    },
    create: async (data) => {
      const id = (data?.[idField as keyof T] ?? ulid()) as Deno.KvKeyPart;
      const key = [...prefix, id];
      data = { [idField]: id, ...data };
      const ok = await kv.atomic().set(key, data).commit();
      if (!ok) throw new Error("Something went wrong.");
      return data as T;
    },
    update: async (id, data) => {
      const key = [...prefix, id];
      const entry = await kv.get<T>(key);
      if (!entry.value) {
        throw new Error(`Entry with key ${JSON.stringify(key)} not found.`);
      }
      const ok = await kv.atomic().check(entry).set(key, data).commit();
      if (!ok) throw new Error("Something went wrong.");
      return data;
    },
    patch: async (id, data) => {
      const key = [...prefix, id];
      const entry = await kv.get<T>(key);
      if (!entry.value) {
        throw new Error(`Entry with key ${JSON.stringify(key)} not found.`);
      }
      data = { ...entry.value, ...data };
      const ok = await kv.atomic().check(entry).set(key, data).commit();
      if (!ok) throw new Error("Something went wrong.");
      return data as T;
    },
    remove: async (id) => {
      const key = [...prefix, id];
      await kv.delete(key);
      return { ok: true };
    },
  };
};
