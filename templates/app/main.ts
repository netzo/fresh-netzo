/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { start } from "$fresh/src/server/mod.ts";
import manifest from "@/fresh.gen.ts";
import config from "./app.netzo.ts";

await start(manifest, await config);
