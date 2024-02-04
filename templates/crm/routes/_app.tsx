import { defineApp, type FreshContext } from "$fresh/server.ts";
import { createContext } from "preact";
import { cn } from "netzo/ui/utils.ts";
import type { NetzoState } from "../../mod.ts";
import * as Layout from "netzo/ui/layout/mod.ts";

export const Ctx = createContext<FreshContext<NetzoState>>(null);

export default defineApp<NetzoState>((req, ctx) => {
  const { auth, ui } = ctx.state.config;
  const { sessionId, sessionUser } = ctx.state.auth ?? {};

  const mustAuth = !!auth && !sessionId;

  const showNav = !!ui?.nav && !mustAuth;
  const showHeader = !!ui?.header;
  const showFooter = true; // enforce Netzo branding

  return (
    <html className="h-full overflow-hidden">
      <Ctx.Provider value={ctx}>
        <head>
          {!!ui?.head && <Layout.Head href={ctx.url.href} {...ui.head} />}
        </head>
        <body
          className={cn(
            "h-full overflow-x-hidden bg-background",
            showNav &&
              "flex flex-row flex-row-reverse md:grid md:grid-cols-[250px_auto]",
          )}
        >
          {showNav && (
            <Layout.Nav
              {...ui.nav}
              className="hidden md:flex w-[250px] md:b-r-1"
            />
          )}
          <div className="flex flex-col w-full h-full overflow-x-hidden">
            {showHeader && (
              <Layout.Header {...ui.header} sessionUser={sessionUser}>
                {showNav && (
                  <Layout.NavMobile {...ui.nav} className="flex md:hidden">
                    <Layout.Nav {...ui.nav} />
                  </Layout.NavMobile>
                )}
              </Layout.Header>
            )}

            <Layout.Main>
              <ctx.Component />
            </Layout.Main>

            {showFooter && <Layout.Footer {...(ui ? ui.footer : {})} />}
          </div>
        </body>
      </Ctx.Provider>
    </html>
  );
});
