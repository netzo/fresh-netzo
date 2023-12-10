import { createApp } from "netzo/framework/mod.ts";
import { ui } from "netzo/framework/plugins/ui/mod.ts";
import { api } from "netzo/framework/plugins/api/mod.ts";
import { bindSignal } from "netzo/framework/plugins/bindSignal/mod.ts";
import {
  createGitHubOAuthConfig,
  auth,
} from "netzo/framework/plugins/auth/mod.ts";

export default createApp({
  access: { level: "internal", userIds: [] },
  auth: {
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
  },
  head: { title: "", description: "", favicon: "", image: "" },
  // plugins: [
  //   // ui(),
  //   api(),
  //   bindSignal(),
  //   auth({
  //     email: {},
  //     oauth2: createGitHubOAuthConfig(),
  //   }),
  // ],
});
