import "std/dotenv/load.ts";
import { defineNetzoConfig } from "netzo/config.ts";
import unoConfig from "./uno.config.ts";

export default defineNetzoConfig({
  modules: {
    unocss: unoConfig,
  },
});
