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
  access: { level: "private", userIds: [], username: "", password: "" },
  portal: {
    email: {},
    oauth2: {},
    title: "",
    description: "",
    color: null,
    backgroundColor: null,
    logo: "",
    caption: "",
    users: [],
  },
  ui: {
    layout: {
      nav: { items: [] },
      header: { title: "", description: "", image: "" },
      footer: {
        innerHTML: '<a href="https://netzo.io/" target="_blank">\n  \n</a>',
      },
    },
    theme: { color: "red", radius: 1 },
    pages: {
      _app: { enabled: true },
      _404: { enabled: true },
      _500: { enabled: true },
    },
    head: { title: "", description: "", favicon: "", image: "" },
  },
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
