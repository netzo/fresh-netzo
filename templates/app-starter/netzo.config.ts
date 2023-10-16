import "std/dotenv/load.ts";
import { defineNetzoConfig } from "netzo/config.ts";
import { createGitHubOAuthConfig, kvOAuthPlugin } from "deno_kv_oauth/mod.ts";
import unoConfig from "./uno.config.ts";

export default defineNetzoConfig({
  project: "stuck-halibut-554329",
  entrypoint: "main.ts",
  modules: {
    unocss: unoConfig,
  },
  plugins: [
    kvOAuthPlugin(createGitHubOAuthConfig()),
  ],
});
