import "std/dotenv/load.ts";
import { defineNetzoConfig } from "netzo/config.ts";
import { daisyui } from "netzo/plugins/daisyui/mod.ts";

export default defineNetzoConfig({
  fresh: {
    plugins: [
      daisyui(),
    ],
  },
});
