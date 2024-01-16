import { monotonicFactory } from "https://deno.land/x/ulid@v0.3.0/mod.ts";
import { filterObjectsByKeyValues } from "../framework/utils/mod.ts";

export const ulid = monotonicFactory();

export const isUlid = (str: string) => {
  // from https://regex101.com/library/ik6xZx
  const ULID = /[0-7][0-9A-HJKMNP-TV-Z]{25}/gm;
  return ULID.test(str);
};

/**
 * Creates a database object that can be used to perform CRUD operations on a Deno KV store.
 * @param kv - The Deno KV store to use.
 * @returns An object with methods for performing CRUD operations on the KV store.
 */
export function createDatabase(kv: Deno.Kv) {
  /**
   * Finds objects in the KV store that match the specified query.
   * @param prefix - The prefix of keys to search for.
   * @param query - An object containing key-value pairs to filter the results by.
   * @returns An array of objects that match the specified query.
   */
  const find = async <T = unknown>(
    prefix: Deno.KvKeyPart[],
    query: Record<string, string> = {},
  ) => {
    const data = (await Array.fromAsync(
      kv.list<T>({ prefix }),
    )).map((res) => res.value);
    return filterObjectsByKeyValues<T>(data, query);
  };

  /**
   * Gets an object from the KV store by key.
   * @param key
   * @returns The object that matches the specified key.
   */
  const get = async <T = unknown>(key: Deno.KvKeyPart[]) => {
    return (await kv.get<T>(key)).value;
  };

  /**
   * Creates one or more objects in the KV store.
   * @param prefix
   * @param data
   * @param idField - The name of the field to use as the ID for the objects.
   * @returns The created object.
   */
  const create = async <T = unknown>(
    prefix: Deno.KvKeyPart[],
    data: T,
    idField: keyof T = "id" as keyof T,
  ) => {
    const id = (data?.[idField] ?? ulid()) as Deno.KvKeyPart;
    const key = [...prefix, id];
    data = { [idField]: id, ...data };
    const ok = await kv.atomic().set(key, data).commit();
    if (!ok) throw new Error("Something went wrong.");
    return data;
  };

  /**
   * Updates an object in the KV store.
   * @param key
   * @param data
   * @returns The updated object.
   */
  const update = async <T = unknown>(key: Deno.KvKeyPart[], data: T) => {
    const entry = await kv.get<T>(key);
    if (!entry.value) throw new Error(`Record with id ${id} not found.`);
    const ok = await kv.atomic().check(entry).set(key, data).commit();
    if (!ok) throw new Error("Something went wrong.");
    return data;
  };

  /**
   * Patches an object in the KV store.
   * @param key
   * @param data
   * @returns The patched object.
   */
  const patch = async <T = unknown>(
    key: Deno.KvKeyPart[],
    data: Partial<T>,
  ) => {
    const entry = await kv.get<T>(key);
    if (!entry.value) throw new Error(`Record with id ${id} not found.`);
    data = { ...entry.value, ...data };
    const ok = await kv.atomic().check(entry).set(key, data).commit();
    if (!ok) throw new Error("Something went wrong.");
    return data;
  };

  /**
   * Removes an object from the KV store.
   * @param key
   */
  const remove = async <T = unknown>(key: Deno.KvKeyPart[]) => {
    return await kv.delete(key);
  };

  return {
    kv,
    find,
    get,
    create,
    update,
    patch,
    remove,
  };
}
