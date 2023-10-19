import "std/dotenv/load.ts";
import { defineNetzoConfig } from "netzo/config.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";
import { authenticationPlugin } from "netzo/authentication/fresh.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

export default defineNetzoConfig({
  project: "sheer-marlin-436696",
  projectKey: "npk_ab875d7c2fd94121d703a489c00406f39291eb70035d2799130126a86590fed5",
  entrypoint: "main.ts",
  plugins: [
    authenticationPlugin(createGitHubOAuthConfig()),
    twindPlugin(twindConfig),
  ],
});
