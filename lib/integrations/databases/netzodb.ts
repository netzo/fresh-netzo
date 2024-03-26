import { queryData, ulid } from "./netzodb.utils.ts";

export { ulid };

const KV = await Deno.openKv();

export type NetzoDBOptions = {
  kv?: Deno.Kv;
};

/**
 * Factory function for the NetzoDB database
 *
 * @see https://netzo.io/docs/modules/databases/netzodb
 *
 * @param {Deno.Kv} kv - a Deno.Kv instance
 * @returns {object} - a DB client instance
 */
export const netzodb = ({ kv = KV }: NetzoDBOptions = {}) => {
  /**
   * Finds objects in the KV store that match the specified query.
   * @param collection - The name of the collection to search for.
   * @param query - An object containing key-value pairs to filter the results by.
   * @returns An array of objects that match the specified query.
   */
  const find = async <T>(
    collection: string,
    query: Record<string, unknown> = {},
  ) => {
    const iterator = kv.list<T>({ prefix: [collection] });
    const data = [];
    for await (const res of iterator) data.push(res.value as T);
    return queryData<T>(data, query);
  };

  /**
   * Gets an object from the KV store by its ID.
   * @param collection - The name of the collection to get the object from.
   * @param id - The ID of the object to get.
   * @returns The object with the specified ID.
   */
  const get = async <T>(collection: string, id: string) => {
    return (await kv.get<T>([collection, id])).value;
  };

  /**
   * Creates one or more objects in the KV store.
   * @param collection - The name of the collection to create the objects in.
   * @param data - The object to create.
   * @param idField - The name of the field to use as the ID for the objects.
   * @returns The created object.
   */
  const create = async <T>(
    collection: string,
    data: T,
    idField: keyof T = "id" as keyof T,
  ) => {
    const id = (data?.[idField] ?? ulid()) as Deno.KvKeyPart;
    const key = [collection, id];
    data = { [idField]: id, ...data };
    const ok = await kv.atomic().set(key, data).commit();
    if (!ok) throw new Error("Failed to create entry");
    return data;
  };

  /**
   * Updates an object in the KV store.
   * @param collection - The name of the collection to update the object in.
   * @param id - The ID of the object to update.
   * @param data - The updated data for the object.
   * @returns The updated object.
   */
  const update = async <T>(
    collection: string,
    id: string,
    data: T,
  ) => {
    const key = [collection, id];
    const entry = await kv.get<T>(key);
    if (!entry.value) throw new Error(`Record with id "${id}" not found.`);
    const ok = await kv.atomic().check(entry).set(key, data).commit();
    if (!ok) throw new Error("Failed to create update entry");
    return data;
  };

  /**
   * Patches an object in the KV store.
   * @param collection - The name of the collection to patch the object in.
   * @param id - The ID of the object to patch.
   * @param data - The partial data to patch the object with.
   * @returns The patched object.
   */
  const patch = async <T>(
    collection: string,
    id: string,
    data: Partial<T>,
  ) => {
    const key = [collection, id];
    const entry = await kv.get<T>(key);
    if (!entry.value) throw new Error(`Record with id "${id}" not found.`);
    data = { ...entry.value, ...data };
    const ok = await kv.atomic().check(entry).set(key, data).commit();
    if (!ok) throw new Error("Failed to patch entry");
    return data;
  };

  /**
   * Removes an object from the KV store.
   * @param collection - The name of the collection to remove the object from.
   * @param id - The ID of the object to remove.
   * @returns The ID of the removed object.
   */
  const remove = async <T>(collection: string, id: string) => {
    // return await kv.delete([collection, id]);
    const key = [collection, id];
    const entry = await kv.get<T>(key);
    if (!entry.value) throw new Error(`Record with id "${id}" not found.`);
    const ok = await kv.atomic().check(entry).delete(key).commit();
    if (!ok) throw new Error("Failed to remove entry");
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
};
