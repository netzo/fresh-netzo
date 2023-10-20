import "std/dotenv/load.ts";
import { defineNetzoConfig } from "netzo/config.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";
import { authenticationPlugin } from "../../lib/authentication/fresh.ts";
import appLayout from "netzo/plugins/appLayout/mod.ts";
import errorPages from "netzo/plugins/errorPages/mod.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

export default defineNetzoConfig({
  project: "sheer-marlin-436696",
  entrypoint: "main.ts",
  visibility: { level: "public" },
  modules: {
    authentication: {},
  },
  plugins: [
    errorPages(),
    authenticationPlugin(createGitHubOAuthConfig()),
    twindPlugin(twindConfig),
  ],
});
