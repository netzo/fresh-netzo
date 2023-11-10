import { defineNetzoConfig } from "netzo/config/mod.ts";
import { auth } from "netzo/plugins/portals/mod.ts";
import { api } from "netzo/plugins/api/mod.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";
import { errorPages } from "netzo/plugins/errorPages/mod.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

export default defineNetzoConfig({
  project: "sheer-marlin-436696",
  plugins: [
    auth({
      email: {},
      oauth2: createGitHubOAuthConfig(),
    }),
    api(),
    errorPages(),
    twindPlugin(twindConfig),
  ],
});