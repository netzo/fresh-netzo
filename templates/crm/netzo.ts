#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes dev.ts
import { createNetzoApp, start } from "netzo/framework/mod.ts";

export const config = await createNetzoApp();

await start(config);
