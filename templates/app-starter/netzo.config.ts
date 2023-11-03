import { defineNetzoConfig } from "netzo/config/mod.ts";
import { authPlugins } from "netzo/auth/plugin.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";
import errorPages from "netzo/plugins/errorPages/mod.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

export default defineNetzoConfig({
  project: "sheer-marlin-436696",
  plugins: [
    ...authPlugins({
      oauth2: createGitHubOAuthConfig(),
    }),
    errorPages(),
    twindPlugin(twindConfig),
  ],
});
