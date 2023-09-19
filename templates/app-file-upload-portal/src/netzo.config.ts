import "std/dotenv/load.ts";
import { defineNetzoConfig } from "netzo/config/mod.ts";
import { daisyui } from "netzo/ui/plugins/daisyui/mod.ts";

export default defineNetzoConfig({
  plugins: [
    daisyui(),
  ],
});
