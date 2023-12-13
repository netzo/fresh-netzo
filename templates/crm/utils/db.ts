import { createDatabase } from "netzo/core/database.ts";

export const kv = await Deno.openKv(Deno.env.get("NETO_DATABASE_URL")!);
export const db = createDatabase(kv);
