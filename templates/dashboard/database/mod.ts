import { collection, kvdex, model } from "https://deno.land/x/kvdex/mod.ts";

const kv = await Deno.openKv();

export const db = kvdex(kv, {});
