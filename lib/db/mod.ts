import { filterObjectsByKeyValues } from "../utils/mod.ts";

const kv = await Deno.openKv();

// rest operations:

export async function find<T = unknown>(
  service: string,
  query: Record<string, string>,
) {
  const kvEntries = await kvList<T>([service]);
  const data = kvEntries.map((d) => d.value);
  return filterObjectsByKeyValues<T>(data, query);
}

export async function get<T = unknown>(service: string, id: string) {
  return await kvGet<T>([service, id]);
}

export async function create<T = unknown>(service: string, data: T) {
  const id = crypto.randomUUID(); // e.g. "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
  return await kvSet<T>([service, id], data);
}

export async function update<T = unknown>(
  service: string,
  id: string,
  data: T,
) {
  return await kvSet<T>([service, id], data);
}

export async function patch<T = unknown>(service: string, id: string, data: T) {
  const currentData = await kvGet<T>([service, id]);
  return await kvSet<T>([service, id], { ...currentData, ...data });
}

export async function remove(service: string, id: string) {
  return await kvDelete([service, id]);
}

// kv operations:

export async function kvList<T = unknown>(prefix: Array<string>) {
  const iter = kv.list<T>({ prefix });
  const data = [];
  for await (const res of iter) data.push(res);
  return data;
}

export async function kvGet<T = unknown>(key: Array<string>) {
  return await kv.get<T>(key);
}

export async function kvSet<T = unknown>(key: Array<string>, value: T) {
  return await kv.set(key, value);
}

export async function kvDelete(key: Array<string>) {
  return await kv.delete(key);
}
