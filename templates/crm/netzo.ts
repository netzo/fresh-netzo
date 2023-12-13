#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes dev.ts
import { createApp, start } from "netzo/framework/mod.ts";

export const config = await createApp();

await start(config);
