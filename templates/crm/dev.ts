#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./netzo.config.ts";

import "std/dotenv/load.ts";

await dev(import.meta.url, "./main.ts", config);
