import { IS_BROWSER } from "../deps/$fresh/runtime.ts";
import { signal } from "../deps/@preact/signals.ts";
import type { ApiClient } from "../apis/_create-api/types.ts";
import { createApi } from "../apis/_create-api/mod.ts";

export type UseApiClientOptions = {
  /** The full path to API service e.g. "/api/accounts". */
  path: string;
  /** The field name to use as the primary key. Defaults to "id". */
  idField?: string;
  /** The REST API methods to expose. Defaults to all methods. */
  methods: ("find" | "get" | "create" | "update" | "patch" | "remove")[];
};

export function useApiClient<T = unknown>(options: UseApiClientOptions) {
  if (!IS_BROWSER) return {};

  const clientURL = new URL(options.path, window.location.origin);

  const client = createApi({ baseURL: clientURL.href });

  const {
    idField = "id",
    methods = ["find", "get", "create", "update", "patch", "remove"],
  } = options;

  const data = signal<T[]>([] as T[]);
  const loading = signal(false);
  const error = signal<string | null>(null);

  const find = async (...args: Parameters<ApiClient["get"]>) => {
    loading.value = true;
    error.value = null;
    try {
      data.value = await client.get<T[]>(...args);
      return data.value;
    } catch (err) {
      error.value = err.message;
      return [];
    } finally {
      loading.value = false;
    }
  };

  const get = (...args: Parameters<ApiClient["get"]>) => {
    loading.value = true;
    error.value = null;
    try {
      return client.get(...args);
    } catch (err) {
      error.value = err.message;
      return [];
    } finally {
      loading.value = false;
    }
  };

  const create = async (...args: Parameters<ApiClient["post"]>) => {
    loading.value = true;
    error.value = null;
    try {
      data.value.push(await client.create(...args) as T);
      return data.value;
    } catch (err) {
      error.value = err.message;
      return [];
    } finally {
      loading.value = false;
    }
  };

  const update = async (...args: Parameters<ApiClient["put"]>) => {
    loading.value = true;
    error.value = null;
    try {
      const newItem = await client.update(...args) as T;
      data.value = data.value.map(
        (item: T) => item[idField] === newItem[idField] ? newItem : item,
      );
      return data.value;
    } catch (err) {
      error.value = err.message;
      return [];
    } finally {
      loading.value = false;
    }
  };

  const patch = async (...args: Parameters<ApiClient["patch"]>) => {
    loading.value = true;
    error.value = null;
    try {
      const newItem = await client.patch(...args) as T;
      data.value = data.value.map(
        (item: T) => item[idField] === newItem[idField] ? newItem : item,
      );
      return data.value;
    } catch (err) {
      error.value = err.message;
      return [];
    } finally {
      loading.value = false;
    }
  };

  const remove = async (...args: Parameters<ApiClient["delete"]>) => {
    loading.value = true;
    error.value = null;
    try {
      await client.remove(...args);
      data.value = data.value.filter((item: T) => item[idField] !== args[0]);
      return data.value;
    } catch (err) {
      error.value = err.message;
      return [];
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    // methods: expose only the methods specified in the options
    // to let netzo/blocks declaratively enable/disable UI elements
    find: methods.includes("find") ? find : undefined,
    get: methods.includes("get") ? get : undefined,
    create: methods.includes("create") ? create : undefined,
    update: methods.includes("update") ? update : undefined,
    patch: methods.includes("patch") ? patch : undefined,
    remove: methods.includes("remove") ? remove : undefined,
  };
}
