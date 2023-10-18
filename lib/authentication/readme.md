# Get Started with [Fresh](https://fresh.deno.dev/)

The minimum required version for plugins in Fresh is 1.3.0 If you're not
performing anything special in the sign-in, sign-out and callback handlers, you
can add the Fresh plugin to your project. This automatically handles
`GET /oauth/signin`, `GET /oauth/callback` and `GET /oauth/signout` routes.

1. Create your OAuth 2.0 application for your given provider.

1. Create your
   [pre-defined](#get-started-with-a-pre-defined-oauth-configuration) or
   [custom](#get-started-with-a-custom-oauth-configuration) OAuth configuration
   and configure Fresh to use the plugin.

   ```ts
   // main.ts
   import { start } from "$fresh/server.ts";
   import {
     createGitHubOAuthConfig,
     netzoAuthPlugin,
   } from "https://deno.land/x/deno_kv_oauth@$VERSION/mod.ts";
   import manifest from "./fresh.gen.ts";

   await start(manifest, {
     plugins: [
       netzoAuthPlugin(createGitHubOAuthConfig()),
     ],
   });
   ```

1. Start your server with the necessary
   [environment variables](#environment-variables).

   ```bash
   GITHUB_CLIENT_ID=xxx GITHUB_CLIENT_SECRET=xxx deno run --unstable --allow-env --allow-net server.ts
   ```

> See the
> [Fresh + Deno KV OAuth demo](https://github.com/denoland/fresh-deno-kv-oauth-demo)
> for an example and
> [Fresh's plugin documentation](https://fresh.deno.dev/docs/concepts/plugins)
> for more information on plugins. See
> [Fresh's documentation](https://fresh.deno.dev/docs/examples/using-deno-kv-oauth)
> on how to get started with the Deno KV OAuth Fresh plugin.
