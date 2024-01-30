// import { IS_BROWSER } from "../deps/$fresh/runtime.ts";
import { computed, signal } from "../deps/@preact/signals.ts";
import type { Service } from "../api/types.ts";

export function useService<T = unknown>(service: Service) {
  const idField = (service?.options?.idField ?? "id") as keyof T;

  const data = signal<T[]>([]);
  const loading = signal(false);
  const error = signal<string | null>(null);

  const $service = computed(() => ({
    ...service,
    // methods:
    find: async (...args: Parameters<typeof service.find>) => {
      loading.value = true;
      error.value = null;
      try {
        data.value = await service.find(...args) as T[];
        return data.value;
      } catch (err) {
        error.value = err.message;
        return [];
      } finally {
        loading.value = false;
      }
    },
    get: (...args: Parameters<typeof service.get>) => {
      loading.value = true;
      error.value = null;
      try {
        return service.get(...args) as T;
      } catch (err) {
        error.value = err.message;
        return [];
      } finally {
        loading.value = false;
      }
    },
    create: async (...args: Parameters<typeof service.create>) => {
      loading.value = true;
      error.value = null;
      try {
        data.value.push(await service.create(...args) as T);
        return data.value;
      } catch (err) {
        error.value = err.message;
        return [];
      } finally {
        loading.value = false;
      }
    },
    update: async (...args: Parameters<typeof service.update>) => {
      loading.value = true;
      error.value = null;
      try {
        const newItem = await service.update(...args) as T;
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
    },
    patch: async (...args: Parameters<typeof service.patch>) => {
      loading.value = true;
      error.value = null;
      try {
        const newItem = await service.patch(...args) as T;
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
    },
    remove: async (...args: Parameters<typeof service.remove>) => {
      loading.value = true;
      error.value = null;
      try {
        await service.remove(...args);
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

  return $service;
}
