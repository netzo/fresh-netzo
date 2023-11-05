import type { AuthState } from "netzo/plugins/auth/mod.ts";
import { defineApp } from "$fresh/server.ts";

export default defineApp<AuthState>((req, ctx) => {
  return (
    <html className="w-full h-full overflow-x-hidden">
      <head>
        <link rel="stylesheet" href="/shadcn-ui.css" />
      </head>
      <body className="w-full h-full overflow-x-hidden">
        <ctx.Component />
      </body>
    </html>
  );
});
