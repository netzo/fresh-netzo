/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "std/dotenv/load.ts";

import { start } from "fresh/server.ts";
import manifest from "./fresh.gen.ts";

import { netzoAppLayout, netzoAuth, netzoErrorPages, unocss } from "netzo/plugins/mod.ts";
import { presetNetzo } from "netzo/ui/mod.ts";


await start(manifest, {
  plugins: [
    netzoAppLayout({ title: 'Docs | netzo/ui' }),
    netzoAuth(),
    netzoErrorPages(),
    unocss({ presets: [presetNetzo()] }),
  ],
});

