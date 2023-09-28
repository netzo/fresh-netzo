/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import manifest from './fresh.gen.js'
import config from './netzo.config.js'
import { start } from '$fresh/server.ts'

await start(manifest, config.fresh)
