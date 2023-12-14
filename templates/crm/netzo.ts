#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes dev.ts
import { createNetzoApp, start } from "netzo/framework/mod.ts";
import manifest from "./fresh.gen.ts";

export const config = await createNetzoApp();

await start(manifest, config);
