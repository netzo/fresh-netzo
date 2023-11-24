import { defineNetzoConfig } from "netzo/config/mod.ts";
import { api } from "netzo/plugins/api/mod.ts";
// import { bindSignal } from "netzo/plugins/bindSignal/mod.ts";
import { errorPages } from "netzo/plugins/errorPages/mod.ts";
// import { loader } from "netzo/plugins/loader/mod.ts";
import { portals } from "netzo/plugins/portals/mod.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

export default defineNetzoConfig({
  database: {
    development: "655f12528750d8da7e73c327",
    production: "655f12528750d8da7e73c327",
  },
  plugins: [
    api(),
    // bindSignal(),
    errorPages(),
    // loader(),
    portals({
      email: {},
      oauth2: createGitHubOAuthConfig(),
    }),
    twindPlugin(twindConfig),
  ],
});