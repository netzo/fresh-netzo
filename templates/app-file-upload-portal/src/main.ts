/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import 'std/dotenv/load.ts'

import { daisyui } from 'netzo/ui/plugins/mod.ts'
import manifest from './fresh.gen.ts'
import { start } from '$fresh/server.ts'

await start(manifest, {
  plugins: [
    daisyui(),
  ],
})
