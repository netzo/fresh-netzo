const kv = await Deno.openKv();

if (!confirm("WARNING: The database will be reset. Continue?")) Deno.exit();

const iterator = kv.list({ prefix: [] });
const promises = [];
for await (const res of iterator) promises.push(kv.delete(res.key));
await Promise.all(promises);

kv.close();
