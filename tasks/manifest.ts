import { join } from "std/path/mod.ts";
import { manifest } from "$fresh/src/dev/mod.ts";
import { type FreshConfig } from "$fresh/server.ts";

const [entrypoint = "netzo.ts"] = Deno.args;

const url = join(Deno.cwd(), entrypoint);
const config: FreshConfig = (await import(url)).netzo.config;
await manifest(Deno.cwd(), config?.router?.ignoreFilePattern);
