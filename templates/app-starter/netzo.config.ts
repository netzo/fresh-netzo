import "std/dotenv/load.ts";
import { defineNetzoConfig } from "netzo/config.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";
import { authenticationPlugin } from "netzo/authentication/fresh.ts";
import errorPages from "netzo/plugins/errorPages/mod.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

export default defineNetzoConfig({
  project: "PROJECT_UID",
  visibility: { level: "public" },
  plugins: [
    errorPages(),
    authenticationPlugin(createGitHubOAuthConfig()),
    twindPlugin(twindConfig),
  ],
});
