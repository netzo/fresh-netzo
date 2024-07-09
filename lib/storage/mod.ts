import { netzo } from "../apis/netzo.ts";
import type { ObjectData } from "../plugins/types.ts";

const IS_BROWSER = typeof window !== "undefined";

export type StorageOptions = {
  apiKey?: string;
  baseURL?: string;
};

/**
 * Factory function for the Storage bucket
 *
 * @param {string} apiKey - the API key to use for authentication
 * @param {string} apiUrl - (internal) the base URL to use for the API
 * @returns {object} - a Storage client instance
 */
export const storage = ({
  apiKey = Deno.env.get("NETZO_API_KEY")!,
  baseURL = IS_BROWSER ? globalThis.location.origin : "https://api.netzo.io",
}: StorageOptions = {}) => {
  const api = netzo({ apiKey, baseURL });

  /**
   * Finds objects that match the specified query.
   * @param query - An object containing key-value pairs to filter the results by.
   * @returns An array of objects that match the specified query.
   */
  const find = async (query: Record<string, unknown> = {}) => {
    const result = await api.objects.get(query);
    return result;
  };

  /**
   * Gets an object by its ID.
   * @param id - The ID of the object to get.
   * @returns The object with the specified ID.
   */
  const get = async (id: string) => {
    const result = await api.objects[id].get();
    return result;
  };

  /**
   * Creates one or more objects.
   * @param data - The object to create.
   * @returns The created object.
   */
  const create = async (data: ObjectData & { file: File }) => {
    const body = new FormData();
    Object.entries(data).forEach(
      ([key, value]: [string, any]) => body.append(key, value),
    );
    const response = await fetch(`${baseURL}/objects`, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        // "content-type" header set to "mutlipart/form-data" automatically
      },
      body,
    });
    if (!response.ok) throw new Error(response.statusText);
    return response;
  };

  /**
   * Patches an object by its ID.
   * @param id - The ID of the object to patch.
   * @param data - The partial data to patch the object with.
   * @returns The patched object.
   */
  const patch = async (id: string, data: Partial<ObjectData>) => {
    const result = await api.objects.patch(id, data);
    return result;
  };

  /**
   * Removes an object by its ID.
   * @param id - The ID of the object to remove.
   * @returns The ID of the removed object.
   */
  const remove = async (id: string) => {
    const result = await api.objects.delete(id);
    return result;
  };

  /**
   * Soft removes an object by its ID.
   * @param id The ID of the object to remove.
   * @returns The removed object.
   */
  const removeSoft = async (id: string) => {
    const result = await api.objects.patch(id, {
      deletedAt: new Date().toISOString(),
    });
    return result;
  };

  return {
    api,
    find,
    get,
    create,
    patch,
    remove,
    removeSoft,
  };
};
