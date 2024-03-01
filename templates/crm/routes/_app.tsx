import { Partial } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { NetzoToolbar } from "netzo/components/blocks/netzo-toolbar/netzo-toolbar.tsx";
import { Head } from "netzo/components/head.tsx";
import { cn } from "netzo/components/utils.ts";
import type { NetzoState } from "netzo/mod.ts";
import { Nav } from "../islands/nav.tsx";

export default defineApp<NetzoState>((req, ctx) => {
  // assert isAuthenticated explicitly (undefined if auth not enabled)
  const mustAuth = ctx.state?.auth?.isAuthenticated === false;

  return (
    <html className="h-full overflow-hidden">
      <head>
        <Head
          title="Netzo CRM"
          description="A starter template for a custom CRM app"
          favicon="/favicon.svg"
          image="/cover.svg"
        />
      </head>
      {mustAuth
        ? (
          <body className={cn("h-screen bg-background")}>
            <main className="grid h-screen">
              <ctx.Component />
            </main>
          </body>
        )
        : (
          <body
            className={cn(
              "h-full bg-background",
              "md:grid md:grid-cols-[250px_auto]",
            )}
          >
            <Nav state={ctx.state} />
            <Partial name="main">
              <main className="grid h-screen">
                <ctx.Component />
              </main>
            </Partial>
            <NetzoToolbar />
          </body>
        )}
    </html>
  );
});
