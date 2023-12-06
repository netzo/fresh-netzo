import { defineNetzoConfig } from "netzo/config/mod.ts";
import { ui } from "netzo/plugins/ui/mod.ts";
import { api } from "netzo/plugins/api/mod.ts";
// import { bindSignal } from "netzo/plugins/bindSignal/mod.ts";
import { errorPages } from "netzo/plugins/errorPages/mod.ts";
// import { loader } from "netzo/plugins/loader/mod.ts";
import { portal } from "netzo/plugins/portal/mod.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";
// import { unocss } from "netzo/plugins/unocss/mod.ts";
// import unoConfig from "./uno.config.ts";

export default defineNetzoConfig({
  plugins: [
    ui(),
    api(),
    // bindSignal(),
    errorPages(),
    // loader(),
    portal({
      email: {},
      oauth2: createGitHubOAuthConfig(),
    }),
    // unocss({ config: unoConfig }),
  ],
});
