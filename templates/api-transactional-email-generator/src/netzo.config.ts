import "std/dotenv/load.ts";
import { defineNetzoConfig } from "netzo/config.ts";
import { flowbite } from "netzo/plugins/flowbite/mod.ts";
import { unocss } from "netzo/plugins/unocss/mod.ts";
import unoConfig from "./uno.config.ts";

export default defineNetzoConfig({
  fresh: {
    plugins: [
      unocss(unoConfig),
      flowbite(),
    ],
  },
});
