const kv = await Deno.openKv();

if (!confirm("WARNING: The database will be reset. Continue?")) Deno.exit();

const promises = (await Array.fromAsync(
  kv.list({ prefix: [] }),
)).map((res) => kv.delete(res.key));
await Promise.all(promises);

kv.close();
