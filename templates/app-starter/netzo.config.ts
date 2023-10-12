import "std/dotenv/load.ts";
import { defineNetzoConfig } from "netzo/config.ts";
import unoConfig from "./uno.config.ts";

export default defineNetzoConfig({
  project: "stuck-halibut-554329",
  entrypoint: "main.ts",
  modules: {
    errorPages: {},
    oauth: { visibility: "public" },
    unocss: unoConfig,
  },
});
