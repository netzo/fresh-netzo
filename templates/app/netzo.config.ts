import { defineNetzoConfig } from "netzo/framework/mod.ts";
// import { authBasic } from "netzo/framework/plugins/authBasic/mod.ts";
import { ui } from "netzo/framework/plugins/ui/mod.ts";
import { api } from "netzo/framework/plugins/api/mod.ts";
import { bindSignal } from "netzo/framework/plugins/bindSignal/mod.ts";
import { portal } from "netzo/framework/plugins/portal/mod.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";
// import { unocss } from "netzo/framework/plugins/unocss/mod.ts";
// import unoConfig from "./uno.config.ts";

export default defineNetzoConfig({
  plugins: [
    // authBasic({
    //   path: "/",
    //   username: "admin",
    //   password: "admin",
    //   realm: "Netzo",
    // }),
    // ui(),
    api(),
    bindSignal(),
    portal({
      email: {},
      oauth2: createGitHubOAuthConfig(),
    }),
    // unocss({ config: unoConfig }),
  ],
});









// netzo.ts
import { createNetzoApp } from "netzo/framework.ts";

await createNetzoApp()














async function createNetzoApp(developerConfig) {
  const config = await getConfigFromProject();

  return {
    ...developerConfig,
    ...config,
  }
}
