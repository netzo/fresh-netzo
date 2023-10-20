import "std/dotenv/load.ts";
import { defineNetzoConfig } from "netzo/config.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";
import { authenticationPlugin } from "netzo/authentication/fresh.ts";
import errorPages from "netzo/plugins/errorPages/mod.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

// replace these with your oauth credentials:
Deno.env.set("GITHUB_CLIENT_ID", "a05e7d546dc9ff966421")
Deno.env.set("GITHUB_CLIENT_SECRET", "8af9e7ea7ea196b9371b98a4d93b745fc677ffeb")

export default defineNetzoConfig({
  project: "PROJECT_UID",
  visibility: { level: "public" },
  plugins: [
    errorPages(),
    authenticationPlugin(createGitHubOAuthConfig()),
    twindPlugin(twindConfig),
  ],
});
