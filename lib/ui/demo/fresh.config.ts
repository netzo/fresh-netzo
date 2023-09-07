import "std/dotenv/load.ts";
import { defineConfig } from "$fresh/server.ts";
import { htmx } from "netzo/ui/plugins/htmx/mod.ts";
import { netzoAuth } from "netzo/ui/plugins/netzoAuth/mod.ts";
import { netzoErrorPages } from "netzo/ui/plugins/netzoErrorPages/mod.ts";
import { unocss } from "netzo/ui/plugins/unocss/mod.ts";
import unoConfig from "./uno.config.ts";

export default defineConfig({
  plugins: [
    netzoAuth({ visibility: "public" }),
    netzoErrorPages(),
    unocss(unoConfig),
    htmx(),
  ],
});
