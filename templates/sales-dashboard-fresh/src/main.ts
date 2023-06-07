/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import '$std/dotenv/load.ts'

import { start } from '$fresh/server.ts'
import manifest from './fresh.gen.ts'

import twindPlugin from '$fresh/plugins/twind.ts'
import twindConfig from './twind.config.ts'
import unocssPlugin from 'netzo/lib/plugins/unocss/mod.ts'

await start(manifest, {
  plugins: [
    twindPlugin(twindConfig),
    // WORKAROUND: use unocss since the tailwind.config of
    // @tremor/react is not being picked up/loaded by twind
    unocssPlugin('uno'),
  ],
})
