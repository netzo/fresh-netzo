import { defineConfig } from "netzo/mod.ts";
import * as netzo from "netzo/plugins/mod.ts";
import { unocss } from "netzo/plugins/unocss/plugin.ts";
import dbConfig from "./plugins/db.config.ts";
import unocssConfig from "./plugins/unocss.config.ts";

export default defineConfig({
  plugins: [
    netzo.environments(),
    // netzo.auth({ providers: { netzo: {} } }),
    netzo.db(dbConfig),
    unocss(unocssConfig),
  ],
});
