import { defineNetzoConfig } from "netzo/config/mod.ts";
import { auth } from "netzo/plugins/auth/mod.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";
import { head } from "netzo/plugins/head/mod.ts";
import { errorPages } from "netzo/plugins/errorPages/mod.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

export default defineNetzoConfig({
  project: "sheer-marlin-436696",
  plugins: [
    ...auth({
      email: {},
      oauth2: createGitHubOAuthConfig(),
    }),
    head({
      title: "CRM",
      description: "CRM app built with Netzo",
      favicon: "/favicon.svg",
      image: "/cover.svg",
    }),
    errorPages(),
    twindPlugin(twindConfig),
  ],
});