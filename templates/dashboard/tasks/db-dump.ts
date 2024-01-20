/**
 * This script prints all entries in the KV database formatted as JSON. This
 * can be used to create a backup file.
 *
 * @example
 * ```bash
 * deno task db:dump > backup.json
 * ```
 */
const kv = await Deno.openKv();

// https://github.com/GoogleChromeLabs/jsbi/issues/30#issuecomment-521460510
function replacer(_key: unknown, value: unknown) {
  return typeof value === "bigint" ? value.toString() : value;
}

const data = (await Array.fromAsync(
  kv.list({ prefix: [] }),
)).map(({ key, value }) => ({ key, value }));

if (Deno.args.includes("--table")) {
  const tables = Object.groupBy(data, ({ key }) => key[0]);
  console.log(tables);

  Object.entries(tables).forEach(([key, results]) => {
    console.log(`\n${key}`);
    const table = results.map(({ key, value }) => ({ key: key[1], ...value }));
    console.table(table);
  });
} else console.log(JSON.stringify(data, replacer, 2));

kv.close();
