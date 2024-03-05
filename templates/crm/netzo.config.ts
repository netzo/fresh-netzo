import { defineConfig } from "netzo/mod.ts";
import * as netzo from "netzo/plugins/mod.ts";
import { unocss } from "netzo/plugins/unocss/plugin.ts";
import apiConfig from "./routes/api.ts";
import unoConfig from "./uno.config.ts";

export default defineConfig({
  plugins: [
    netzo.environments(),
    // netzo.auth({ providers: { netzo: {} } }),
    netzo.api(apiConfig),
    unocss({ config: unoConfig }),
  ],
});
