/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import 'std/dotenv/load.ts'

import { start } from 'fresh/server.ts'
import manifest from './fresh.gen.ts'

import unocssPlugin from 'netzo/lib/plugins/unocss/mod.ts'
import { presetNetzo } from 'netzo/lib/ui/mod.ts'
import flowbitePlugin from 'netzo/lib/plugins/flowbite/mod.ts'

await start(manifest, {
  plugins: [
    unocssPlugin({ presets: [presetNetzo()] }),
    flowbitePlugin(),
  ],
})
