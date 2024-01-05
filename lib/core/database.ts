import { multiSet } from "https://deno.land/x/kv_utils@1.1.1/mod.ts";
import { monotonicFactory } from "https://deno.land/x/ulid@v0.3.0/mod.ts";
import { filterObjectsByKeyValues } from "../framework/utils/mod.ts";

export const ulid = monotonicFactory();

/**
 * Creates a database object that can be used to perform CRUD operations on a Deno KV store.
 * @param kv - The Deno KV store to use.
 * @returns An object with methods for performing CRUD operations on the KV store.
 */
export function createDatabase(kv: Deno.Kv) {
  /**
   * Finds objects in the KV store that match the specified query.
   * @param resource - The name of the resource to search for.
   * @param query - An object containing key-value pairs to filter the results by.
   * @returns An array of objects that match the specified query.
   */
  const find = async <T>(
    resource: string,
    query: Record<string, string> = {},
  ) => {
    const data = (await Array.fromAsync(
      kv.list<T>({ prefix: [resource] }),
    )).map((res) => res.value);
    return filterObjectsByKeyValues<T>(data, query);
  };

  /**
   * Gets an object from the KV store by its ID.
   * @param resource - The name of the resource to get the object from.
   * @param id - The ID of the object to get.
   * @returns The object with the specified ID.
   */
  const get = async <T>(resource: string, id: string) => {
    return (await kv.get<T>([resource, id])).value;
  };

  /**
   * Creates one or more objects in the KV store.
   * @param resource - The name of the resource to create the objects in.
   * @param data - The object to create.
   * @param idField - The name of the field to use as the ID for the objects.
   * @returns The created object.
   */
  const create = async <T>(
    resource: string,
    data: T,
    idField: keyof T = "id" as keyof T,
  ) => {
    const id = (data?.[idField] ?? ulid()) as Deno.KvKeyPart;
    const key = [resource, id];
    data = { [idField]: id, ...data };
    const ok = await kv.atomic().set(key, data).commit();
    if (!ok) throw new Error("Something went wrong.");
    return data;
  };

  /**
   * Updates an object in the KV store.
   * @param resource - The name of the resource to update the object in.
   * @param id - The ID of the object to update.
   * @param data - The updated data for the object.
   * @returns The updated object.
   */
  const update = async <T>(
    resource: string,
    id: string,
    data: T,
  ) => {
    const key = [resource, id];
    const entry = await kv.get<T>(key);
    if (!entry.value) throw new Error(`Record with id ${id} not found.`);
    const ok = await kv.atomic().check(entry).set(key, data).commit();
    if (!ok) throw new Error("Something went wrong.");
    return data;
  };

  /**
   * Patches an object in the KV store.
   * @param resource - The name of the resource to patch the object in.
   * @param id - The ID of the object to patch.
   * @param data - The partial data to patch the object with.
   * @returns The patched object.
   */
  const patch = async <T>(
    resource: string,
    id: string,
    data: Partial<T>,
  ) => {
    const key = [resource, id];
    const entry = await kv.get<T>(key);
    if (!entry.value) throw new Error(`Record with id ${id} not found.`);
    data = { ...entry.value, ...data };
    const ok = await kv.atomic().check(entry).set(key, data).commit();
    if (!ok) throw new Error("Something went wrong.");
    return data;
  };

  /**
   * Removes an object from the KV store.
   * @param resource - The name of the resource to remove the object from.
   * @param id - The ID of the object to remove.
   * @returns The ID of the removed object.
   */
  const remove = async <T>(resource: string, id: string) => {
    // return await kv.delete([resource, id]);
    const key = [resource, id];
    const entry = await kv.get<T>(key);
    if (!entry.value) throw new Error(`Record with id ${id} not found.`);
    const ok = await kv.atomic().check(entry).delete(key).commit();
    if (!ok) throw new Error("Something went wrong.");
    return id;
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
