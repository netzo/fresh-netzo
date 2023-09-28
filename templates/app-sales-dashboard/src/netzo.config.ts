import "std/dotenv/load.ts";
import { defineNetzoConfig } from "netzo/config.ts";
import { unocss } from "netzo/modules/unocss/mod.ts";
import unoConfig from "./uno.config.ts";

export default defineNetzoConfig({
  fresh: {
    plugins: [
      unocss(unoConfig),
    ],
  },
});
