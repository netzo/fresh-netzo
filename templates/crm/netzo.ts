#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes dev.ts
import { createNetzoApp } from "netzo/framework/mod.ts";

export const app = await createNetzoApp(Deno.env.get("NETZO_PROJECT_ID")!);

if (import.meta.main) app.start();
