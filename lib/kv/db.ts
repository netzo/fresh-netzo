const kv = await Deno.openKv();

export async function list(prefix: Array<string>) {
  const iter = kv.list<string>({ prefix });
  const results = [];
  for await (const res of iter) results.push(res);
  return results;
}

export async function get(key: Array<string>) {
  return await kv.get(key);
}

// deno-lint-ignore no-explicit-any
export async function set(key: Array<string>, value: any) {
  return await kv.set(key, value);
}

export async function deleteKey(key: Array<string>) {
  return await kv.delete(key);
}