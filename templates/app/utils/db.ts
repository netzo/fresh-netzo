import { createDatabase } from "netzo/database/mod.ts";

export const kv = await Deno.openKv();
export const db = createDatabase(kv);
