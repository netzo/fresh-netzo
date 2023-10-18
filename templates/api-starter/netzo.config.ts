import "std/dotenv/load.ts";
import { defineNetzoConfig } from "netzo/config.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";
import { netzoAuthPlugin } from "netzo/modules/auth/fresh.plugin.ts"
import unoConfig from "./uno.config.ts";

export default defineNetzoConfig({
  project: "stuck-halibut-554329",
  entrypoint: "main.ts",
  modules: {
    unocss: unoConfig,
  },
  plugins: [
    netzoAuthPlugin(createGitHubOAuthConfig()),
  ],
});
