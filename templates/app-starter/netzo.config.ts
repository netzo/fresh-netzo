import "std/dotenv/load.ts";
import { defineNetzoConfig } from "netzo/config.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";
import { netzoAuthPlugin } from "netzo/authentication/fresh.plugin.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

export default defineNetzoConfig({
  project: "stuck-halibut-554329",
  entrypoint: "main.ts",
  modules: {},
  plugins: [
    netzoAuthPlugin(createGitHubOAuthConfig()),
    twindPlugin(twindConfig),
  ],
});
