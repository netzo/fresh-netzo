/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "std/dotenv/load.ts";

import { start } from "fresh/server.ts";
import manifest from "./fresh.gen.ts";

import { netzoAuth, netzoErrorPages, unocss } from "netzo/plugins/mod.ts";
import { presetNetzo } from "netzo/ui/unocss.ts";

await start(manifest, {
  plugins: [
    netzoAuth({ visibility: "public" }),
    netzoErrorPages(),
    unocss({ presets: [presetNetzo()] }),
  ],
});
