import { defineNetzoConfig } from "netzo/config/mod.ts";
import { auth } from "netzo/plugins/auth/mod.ts";
import { appLayout } from "netzo/plugins/appLayout/mod.ts";
import { api } from "netzo/plugins/api/mod.ts";
import { createGitHubOAuthConfig } from "deno_kv_oauth/mod.ts";
import { errorPages } from "netzo/plugins/errorPages/mod.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

export default defineNetzoConfig({
  project: "sheer-marlin-436696",
  plugins: [
    auth({
      email: {},
      oauth2: createGitHubOAuthConfig(),
    }),
    appLayout({
      title: "Agbar | Admin Panel",
      description: "Herramienta de administración y gestion de Agbar",
      favicon:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi-vXRSWKKnrGxki2DRNUfFrB4W_SUPoGAoPVJx7BCJoEgxUosgHczuX6C7PX3gaCk0RQ&usqp=CAU",
      image: {
        src:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi-vXRSWKKnrGxki2DRNUfFrB4W_SUPoGAoPVJx7BCJoEgxUosgHczuX6C7PX3gaCk0RQ&usqp=CAU",
        // class: "dark:filter-invert",
      },
    }),
    api(),
    errorPages(),
    twindPlugin(twindConfig),
  ],
});