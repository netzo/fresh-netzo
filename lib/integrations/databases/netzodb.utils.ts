import { useSignal } from "@preact/signals";
import { _get } from "../../deps/lodash.get.ts";
import { monotonicFactory, type ULID } from "../../deps/ulid.ts";

export const ulid = monotonicFactory();

export type Id = string | number | ULID;

export function useSignalNetzoDB<T>(collection: string, data: T) {
  const endpoint = `/api/${collection}`;

  const model = useSignal<T>(data);

  return Object.assign(model, {
    get: async () => {
      const response = await fetch(`${endpoint}/${model.value.id}`);
      if (!response.ok) throw new Error(response.statusText);
      const data = (await response.json());
      model.value = data;
      return model.value;
    },
    create: async () => {
      const { id, ...value } = model.value;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(value),
      });
      if (!response.ok) throw new Error(response.statusText);
      const data = (await response.json());
      model.value = data;
      return model.value;
    },
    update: async () => {
      const response = await fetch(`${endpoint}/${model.value.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(model.value),
      });
      if (!response.ok) throw new Error(response.statusText);
      const data = (await response.json());
      model.value = data;
      return model.value;
    },
    patch: async () => {
      const response = await fetch(`${endpoint}/${model.value.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(model.value),
      });
      if (!response.ok) throw new Error(response.statusText);
      const data = (await response.json());
      model.value = data;
      return model.value;
    },
    remove: async () => {
      const response = await fetch(`${endpoint}/${model.value.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(response.statusText);
      return model.value;
    },
    archive: async () => {
      const response = await fetch(`${endpoint}/${model.value.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ deletedAt: new Date().toISOString() }),
      });
      if (!response.ok) throw new Error(response.statusText);
      const data = (await response.json());
      model.value = data;
      return model.value;
    },
    duplicate: async () => {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(model.value),
      });
      if (!response.ok) throw new Error(response.statusText);
      const data = (await response.json());
      model.value = data;
      return model.value;
    },
  });
};

export function filterObjectsByKeyValues<T = unknown>(
  data: T[],
  filters: Record<string, any> = {},
) {
  // filter item out if any of the filters fail, otherwise keep it
  return !Object.keys(filters).length ? data : data.filter((item) => {
    return !Object.entries(filters).some(([key, value]) => {
      const itemValue = _get(item, key, "").toString();
      return itemValue?.toLowerCase() !== value?.toLowerCase(); // case insensitive
    });
  });
}
