#!/usr/bin/env -S deno run -A --unstable --env --watch=static/,routes dev.ts
import { createNetzoApp } from "netzo/framework/mod.ts";
import manifest from "./fresh.gen.ts";

export const app = await createNetzoApp(
  manifest,
  Deno.env.get("NETZO_PROJECT_ID")!,
);
