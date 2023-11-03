#!/usr/bin/env -S deno run -A --watch=static/,routes/

import config from './netzo.config.js'
import dev from '$fresh/dev.ts'

await dev(import.meta.url, './main.ts', await config)
