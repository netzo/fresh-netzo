import { defineNetzoConfig } from "netzo/config/mod.ts";
import { authPlugins } from "netzo/plugins/auth/mod.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "@/twind.config.ts";

export default defineNetzoConfig({
  plugins: [
    ...authPlugins({
      oauth2: createGitHubOAuthConfig(),
    }),
    twindPlugin(twindConfig),
  ],
});