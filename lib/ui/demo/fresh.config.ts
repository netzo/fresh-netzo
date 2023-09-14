import "std/dotenv/load.ts";
import { defineConfig } from "$fresh/server.ts";
import { htmx } from "netzo/ui/plugins/htmx/mod.ts";
import { netzoAuth } from "netzo/ui/plugins/netzoAuth/mod.ts";
import { netzoDB } from "netzo/ui/plugins/netzoDB/mod.ts";
import { netzoErrorPages } from "netzo/ui/plugins/netzoErrorPages/mod.ts";
import { unocss } from "netzo/ui/plugins/unocss/mod.ts";
import unoConfig from "./uno.config.ts";

export default defineConfig({
  plugins: [
    netzoAuth({ visibility: "public" }),
    netzoDB({ prefix: 'db' }),
    netzoErrorPages(),
    unocss(unoConfig),
    htmx(),
  ],
});
