/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "std/dotenv/load.ts";

import { start } from "fresh/server.ts";
import manifest from "./fresh.gen.ts";

import { unocss,/*  app, visibility */ } from "netzo/plugins/mod.ts";
import { presetNetzo } from "netzo/ui/mod.ts";


await start(manifest, {
  plugins: [
    unocss({ presets: [presetNetzo()] }),
    // app({ title: 'Docs | netzo/ui' }),
    // visibility(),
  ],
});

