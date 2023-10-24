import "std/dotenv/load.ts";
import { defineNetzoConfig } from "netzo/config.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";
import { authenticationPlugins } from "netzo/authentication/plugin.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "@/twind.config.ts";

export default defineNetzoConfig({
  project: "sheer-marlin-436696",
  visibility: { level: "public" },
  // authentication: {
  //   oauth2: { oauth2: createGitHubOAuthConfig() },
  // },
  plugins: [
    ...authenticationPlugins({ oauth2: createGitHubOAuthConfig() }),
    twindPlugin(twindConfig),
  ],
});
