// import { IS_BROWSER } from "../deps/$fresh/runtime.ts";
import { computed, signal } from "../deps/@preact/signals.ts";
import type { Resource } from "../resources/mod.ts";

export function useResource<T = unknown>(resource: Resource) {
  const idField = (resource?.options?.idField ?? "id") as keyof T;

  const data = signal<T[]>([]);
  const loading = signal(false);
  const error = signal<string | null>(null);

  const $resource = computed(() => ({
    ...resource,
    // methods:
    find: async (...args: Parameters<typeof resource.find>) => {
      loading.value = true;
      error.value = null;
      try {
        data.value = await resource.find(...args) as T[];
        return data.value;
      } catch (err) {
        error.value = err.message;
        return [];
      } finally {
        loading.value = false;
      }
    },
    get: (...args: Parameters<typeof resource.get>) => {
      loading.value = true;
      error.value = null;
      try {
        return resource.get(...args) as T;
      } catch (err) {
        error.value = err.message;
        return [];
      } finally {
        loading.value = false;
      }
    },
    create: async (...args: Parameters<typeof resource.create>) => {
      loading.value = true;
      error.value = null;
      try {
        data.value.push(await resource.create(...args) as T);
        return data.value;
      } catch (err) {
        error.value = err.message;
        return [];
      } finally {
        loading.value = false;
      }
    },
    update: async (...args: Parameters<typeof resource.update>) => {
      loading.value = true;
      error.value = null;
      try {
        const newItem = await resource.update(...args) as T;
        data.value = data.value.map(
          (item: T) => item[idField] === newItem[idField] ? newItem : item
        );
        return data.value;
      } catch (err) {
        error.value = err.message;
        return [];
      } finally {
        loading.value = false;
      }
    },
    patch: async (...args: Parameters<typeof resource.patch>) => {
      loading.value = true;
      error.value = null;
      try {
        const newItem = await resource.patch(...args) as T;
        data.value = data.value.map(
          (item: T) => item[idField] === newItem[idField] ? newItem : item
        );
        return data.value;
      } catch (err) {
        error.value = err.message;
        return [];
      } finally {
        loading.value = false;
      }
    },
    remove: async (...args: Parameters<typeof resource.remove>) => {
      loading.value = true;
      error.value = null;
      try {
        await resource.remove(...args);
        data.value = data.value.filter((item: T) => item[idField] !== args[0]);
        return data.value;
      } catch (err) {
        error.value = err.message;
        return [];
      } finally {
        loading.value = false;
      }
    },
    // state:
    data: data.value,
    loading: loading.value,
    error: error.value,
  }));

  return $resource;
}
