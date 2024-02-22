const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH"));

export const dbReset = async () => {
  if (!confirm("WARNING: The database will be reset. Continue?")) Deno.exit(0);

  const promises = (await Array.fromAsync(
    kv.list({ prefix: [] }),
  )).map((res) => kv.delete(res.key));
  await Promise.all(promises);

  Deno.exit(0);
};

if (import.meta.main) dbReset();
