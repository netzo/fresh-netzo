import { defineApp } from "../../../deps/$fresh/server.ts";
import { Partial } from "../../../deps/$fresh/runtime.ts";
import { cn } from "../../../components/utils.ts";
import type { NetzoState } from "../../mod.ts";
import { Head } from "../../../components/utils/head.tsx";
import { Header } from "../../../components/layout/header.tsx";
import { Footer } from "../../../components/layout/footer.tsx";
import { Nav } from "../../../components/layout/nav.tsx";
import { NavMobile } from "../../../components/layout/nav.mobile.tsx";

export default defineApp<NetzoState>((req, ctx) => {
  const { auth, ui } = ctx.state.config;
  const { sessionId, sessionUser } = ctx.state.auth ?? {};

  const mustAuth = !!auth && !sessionId;

  const showNav = !!ui?.nav && !mustAuth;
  const showHeader = !!ui?.header;
  const showFooter = true; // enforce Netzo branding

  return (
    <html className="h-full overflow-hidden">
      <head>
        {!!ui?.head && <Head href={ctx.url.href} {...ui.head} />}
      </head>
      <body
        className={cn(
          "h-full overflow-x-hidden bg-background",
          showNav &&
            "flex flex-row flex-row-reverse md:grid md:grid-cols-[250px_auto]",
        )}
      >
        {showNav && (
          <Nav {...ui.nav} className="hidden md:flex w-[250px] md:b-r-1" />
        )}
        <div className="flex flex-col w-full h-full overflow-x-hidden">
          {showHeader && (
            <Header {...ui.header} sessionUser={sessionUser}>
              {showNav && (
                <NavMobile {...ui.nav} className="flex md:hidden">
                  <Nav {...ui.nav} />
                </NavMobile>
              )}
            </Header>
          )}

          {mustAuth
            ? (
              <main className="flex-1">
                <ctx.Component />
              </main>
            )
            : (
              <main className="flex-1">
                <Partial name="main">
                  <ctx.Component />
                </Partial>
              </main>
            )}

          {showFooter && <Footer {...(ui ? ui.footer : {})} />}
        </div>
      </body>
    </html>
  );
});
