import { defineApp } from "$fresh/src/server/mod.ts";
import { Partial } from "$fresh/src/runtime/Partial.tsx";
import { cn } from "netzo/components/utils.ts";
import type { NetzoState } from "../../../framework/mod.ts";
import { Nav } from "../components/nav.tsx";
import { Footer } from "../components/footer.tsx";
import { Head } from "../components/head.tsx";
import Header from "../islands/header.tsx";

export default defineApp<NetzoState>((_req, ctx) => {
  const { portal: { sessionId } = {}, ui = {} } = ctx.state;
  const { head, layout: { header, nav, footer } } = ui;

  return (
    <html className="h-full overflow-hidden">
      <head>
        <Head {...head} href={ctx.url.href} />
      </head>
      {sessionId
        ? (
          <body
            f-client-nav
            className={cn(
              "h-full overflow-x-hidden grid lg:grid-cols-[250px_auto]",
              "bg-[hsl(var(--background))]",
            )}
          >
            <Nav {...nav} sessionUser={ctx.state.portal?.sessionUser} />

            <div className="flex flex-col w-full h-full overflow-x-hidden">
              <Header {...header} />

              <main className="flex-1">
                <Partial name="main">
                  <ctx.Component />
                </Partial>
              </main>

              <Footer className="sticky bottom-0" {...footer} />
            </div>
          </body>
        )
        : (
          <body
            f-client-nav
            className={cn(
              "h-full overflow-x-hidden",
              "bg-[hsl(var(--background))]",
            )}
          >
            <div className="flex flex-col w-full h-full overflow-x-hidden">
              <main className="flex-1">
                <Partial name="main">
                  <ctx.Component />
                </Partial>
              </main>

              <Footer className="sticky bottom-0" {...footer} />
            </div>
          </body>
        )}
    </html>
  );
});
