import "std/dotenv/load.ts";
import { defineConfig } from "$fresh/server.ts";
import { daisyui } from "netzo/ui/plugins/daisyui/mod.ts";

export default defineConfig({
  plugins: [
    daisyui(),
  ],
});
