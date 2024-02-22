import { Partial } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { Head } from "netzo/components/head.tsx";
import { cn } from "netzo/components/utils.ts";
import { type NetzoState } from "netzo/mod.ts";
import { useAuth } from "netzo/plugins/auth/plugin.ts";
import { Nav } from "../islands/nav.tsx";

export default defineApp<NetzoState>((req, ctx) => {
  const { sessionId, sessionUser, mustAuth } = useAuth(ctx);

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
          <body className={cn("h-full bg-background")}>
            <div className="flex flex-col w-full h-full overflow-x-hidden">
              <main className="flex-1">
                <ctx.Component />
              </main>
            </div>
          </body>
        )
        : (
          <body
            className={cn(
              "h-full bg-background",
              "md:grid md:grid-cols-[250px_auto]",
            )}
          >
            <Nav sessionUser={sessionUser} />
            <div className="flex flex-col w-full h-full overflow-x-hidden">
              <main className="flex-1">
                <Partial name="main">
                  <ctx.Component />
                </Partial>
              </main>
            </div>
          </body>
        )}
    </html>
  );
});
