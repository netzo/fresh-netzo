import { createApp } from "netzo/framework/mod.ts";
// import { authBasic } from "netzo/framework/plugins/authBasic/mod.ts";
import { ui } from "netzo/framework/plugins/ui/mod.ts";
import { api } from "netzo/framework/plugins/api/mod.ts";
import { bindSignal } from "netzo/framework/plugins/bindSignal/mod.ts";
import {
  createGitHubOAuthConfig,
  portal,
} from "netzo/framework/plugins/portal/mod.ts";
// import { unocss } from "netzo/framework/plugins/unocss/mod.ts";
// import unoConfig from "./uno.config.ts";

export default createApp({
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
