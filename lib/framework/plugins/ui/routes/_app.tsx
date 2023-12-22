import { defineApp } from "../../../../deps/$fresh/server.ts";
import { Partial } from "../../../../deps/$fresh/runtime.ts";
import { cn } from "../../../../components/utils.ts";
import type { NetzoState } from "../../../../framework/mod.ts";
import { Head } from "../components/head.tsx";
import { Nav } from "../islands/nav.tsx";
import { NavMobile } from "../islands/nav-mobile.tsx";
import { Footer } from "../islands/footer.tsx";
import Header from "../islands/header.tsx";
import { enabled } from "../../mod.ts";

export default defineApp<NetzoState>((_req, ctx) => {
  const { auth, ui } = ctx.state.config;
  const { sessionId, sessionUser } = ctx.state.auth ?? {};

  const enabledExternalAuth = enabled(auth) && auth.level === "external";

  return (
    <html className="h-full overflow-hidden">
      <head>
        {enabled(ui?.head) && <Head href={ctx.url.href} {...ui.head} />}
      </head>
      {enabledExternalAuth && !sessionId
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

              {enabled(ui?.footer) && (
                <Footer className="sticky bottom-0" {...ui.footer} />
              )}
            </div>
          </body>
        )
        : (
          <body
            f-client-nav
            className={cn(
              "h-full overflow-x-hidden",
              enabled(ui?.nav) &&
                "flex flex-row-reverse md:grid md:grid-cols-[250px_auto]",
              "bg-[hsl(var(--background))]",
            )}
          >
            {enabled(ui?.nav) && (
              <Nav
                {...ui.nav}
                sessionUser={sessionUser}
                className="hidden md:flex md:flex-col w-[250px] md:border-r md:border-[hsl(var(--border))]"
              />
            )}

            <div className="flex flex-col w-full h-full overflow-x-hidden">
              {enabled(ui?.header) && (
                <Header {...ui.header} nav={ui.nav}>
                  <NavMobile
                    {...ui.nav}
                    sessionUser={sessionUser}
                    className="mr-4 md:hidden"
                  />
                </Header>
              )}

              <main className="flex-1">
                <Partial name="main">
                  <ctx.Component />
                </Partial>
              </main>

              {enabled(ui?.footer) && (
                <Footer className="sticky bottom-0" {...ui.footer} />
              )}
            </div>
          </body>
        )}
    </html>
  );
});
