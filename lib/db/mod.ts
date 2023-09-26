import { multiSet } from "https://deno.land/x/kv_utils@1.1.1/mod.ts";
import { filterObjectsByKeyValues } from "../utils/mod.ts";

const kv = await Deno.openKv();

export const find = async <T = unknown>(
  resource: string,
  query: Record<string, string> = {},
) => {
  const iterator = kv.list<T>({ prefix: [resource] });
  const data = [];
  for await (const res of iterator) data.push(res.value as T);
  return filterObjectsByKeyValues<T>(data, query);
};

export const get = async <T = unknown>(resource: string, id: string) => {
  return (await kv.get<T>([resource, id])).value;
};

export const create = async <T = unknown>(
  resource: string,
  data: T | T[],
  idField: keyof T = "id" as keyof T,
) => {
  if (Array.isArray(data)) {
    const keyValues: Map<Deno.KvKey, unknown> = new Map();
    for (const item of data) {
      const id = String(item[idField]) || crypto.randomUUID();
      keyValues.set([resource, id], item);
    }
    const result = await multiSet(keyValues);
    if (!result.ok) throw new Error(`Failed to set keys: ${result.failedKeys}`);
    return data;
  } else {
    const id = String(data[idField]) || crypto.randomUUID();
    const key = [resource, id];
    const ok = await kv.atomic().set(key, data).commit();
    if (!ok) throw new Error("Something went wrong.");
    return data;
  }
};

export const update = async <T = unknown>(
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

export const patch = async <T = unknown>(
  resource: string,
  id: string,
  data: T,
) => {
  const key = [resource, id];
  const entry = await kv.get<T>(key);
  if (!entry.value) throw new Error(`Record with id ${id} not found.`);
  data = { ...entry.value, ...data };
  const ok = await kv.atomic().check(entry).set(key, data).commit();
  if (!ok) throw new Error("Something went wrong.");
  return data;
};

export const remove = async <T = unknown>(resource: string, id: string) => {
  // return await kv.delete([resource, id]);
  const key = [resource, id];
  const entry = await kv.get<T>(key);
  if (!entry.value) throw new Error(`Record with id ${id} not found.`);
  const ok = await kv.atomic().check(entry).delete(key).commit();
  if (!ok) throw new Error("Something went wrong.");
  return id;
};


