/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "std/dotenv/load.ts";

import { start } from "fresh/server.ts";
import manifest from "./fresh.gen.ts";

import unocss from "netzo/plugins/unocss/mod.ts";
import { presetNetzo } from "netzo/ui/components/mod.ts";
import flowbite from "netzo/plugins/flowbite/mod.ts";

await start(manifest, {
  plugins: [
    unocss({ presets: [presetNetzo()] }),
    flowbite(),
  ],
});
