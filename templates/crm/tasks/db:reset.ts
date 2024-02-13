const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH"));

if (!confirm("WARNING: The database will be reset. Continue?")) Deno.exit(0);

const promises = (await Array.fromAsync(
  kv.list({ prefix: [] }),
)).map((res) => kv.delete(res.key));
await Promise.all(promises);

kv.close();
