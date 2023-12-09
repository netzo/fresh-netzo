#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./app.netzo.ts";

await dev(import.meta.url, "@/main.ts", await config);
