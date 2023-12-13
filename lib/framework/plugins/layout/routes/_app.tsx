import { defineApp } from "../../../../deps/$fresh/server.ts";
import { Partial } from "../../../../deps/$fresh/runtime.ts";
import { cn } from "../../../../components/utils.ts";
import type { NetzoState } from "../../../../framework/mod.ts";
import { Nav } from "../components/nav.tsx";
import { Footer } from "../components/footer.tsx";
import { Head } from "../components/head.tsx";
import Header from "../islands/header.tsx";

export default defineApp<NetzoState>((_req, ctx) => {
  const { title, description, favicon, image, auth, layout } = ctx.state.config;
  const { sessionId, sessionUser } = ctx.state.auth ?? {};

  const authExternalEnabled = auth?.enabled && auth.level === "external";

  return (
    <html className="h-full overflow-hidden">
      <head>
        <Head {...{ title, description, favicon, image, href: ctx.url.href }} />
      </head>
      {authExternalEnabled && !sessionId
        ? (
          <body
            className={cn(
              "h-full overflow-x-hidden",
              "bg-[hsl(var(--background))]",
            )}
          >
            <div className="flex flex-col w-full h-full overflow-x-hidden">
              <main className="flex-1">
                <ctx.Component />
              </main>

              <Footer className="sticky bottom-0" {...layout.footer} />
            </div>
          </body>
        )
        : (
          <body
            f-client-nav
            className={cn(
              "h-full overflow-x-hidden grid lg:grid-cols-[250px_auto]",
              "bg-[hsl(var(--background))]",
            )}
          >
            <Nav {...layout.nav} sessionUser={sessionUser} />

            <div className="flex flex-col w-full h-full overflow-x-hidden">
              <Header {...layout.header} />

              <main className="flex-1">
                <Partial name="main">
                  <ctx.Component />
                </Partial>
              </main>

              <Footer className="sticky bottom-0" {...layout.footer} />
            </div>
          </body>
        )}
    </html>
  );
});
