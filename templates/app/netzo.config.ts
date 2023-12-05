import { defineNetzoConfig } from "netzo/config/mod.ts";
import { api } from "netzo/plugins/api/mod.ts";
// import { bindSignal } from "netzo/plugins/bindSignal/mod.ts";
import { errorPages } from "netzo/plugins/errorPages/mod.ts";
// import { loader } from "netzo/plugins/loader/mod.ts";
import { portal } from "netzo/plugins/portal/mod.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";
import { unocss } from "netzo/plugins/unocss/mod.ts";

export default defineNetzoConfig({
  plugins: [
    api(),
    // bindSignal(),
    errorPages(),
    // loader(),
    portal({
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
    unocss(),
  ],
});
