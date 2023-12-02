import { defineNetzoConfig } from "netzo/config/mod.ts";
import { api } from "netzo/plugins/api/mod.ts";
// import { bindSignal } from "netzo/plugins/bindSignal/mod.ts";
import { errorPages } from "netzo/plugins/errorPages/mod.ts";
// import { loader } from "netzo/plugins/loader/mod.ts";
import { portals } from "netzo/plugins/portals/mod.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";
import { unocss } from "netzo/plugins/unocss/mod.ts";
import unocssConfig from "./uno.config.ts";

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
      // NOTE: only links should be added here, everything else comes from UI in Netzo
      // logo: "https://deno.land/logo.svg",
      // header: {},
      // navigation: [
      //   { name: "Home", href: "/" },
      //   { name: "About", href: "/about" },
      //   { name: "Contact", href: "/contact" },
      // ],
      // footer: {},
    }),
    unocss(unocssConfig),
  ],
});
