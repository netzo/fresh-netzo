import { createDatabase } from "netzo/db/mod.ts";

export const kv = await Deno.openKv();
export const db = createDatabase(kv);
