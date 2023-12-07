import { defineApp } from "$fresh/src/server/mod.ts";
import { Partial } from "$fresh/src/runtime/Partial.tsx";
import type { NetzoState } from "../../config/mod.ts";
import { Head } from "./head.tsx";
import { Nav } from "./nav.tsx";
import Header from "./islands/header.tsx";
import { Footer } from "./footer.tsx";

export default defineApp<NetzoState>((_req, ctx) => {
  const { portal: { sessionId } = {}, ui = {} } = ctx.state;
  const { head, header, nav, footer } = ui;

  console.log(ui);

  return (
    <html className="h-full overflow-hidden">
      <head>
        <Head {...head} href={ctx.url.href} />
      </head>
      {sessionId
        ? (
          <body
            f-client-nav
            className="h-full overflow-x-hidden grid lg:grid-cols-[250px_auto]"
          >
            <Nav {...nav} sessionUser={ctx.state.portal?.sessionUser} />

            <div className="flex flex-col w-full h-full overflow-x-hidden">
              <Header
                {...ui}
                url={ctx.url}
                sessionUser={ctx.state.portal?.sessionUser}
              />

              <main className="flex-1">
                <Partial name="main">
                  <ctx.Component />
                </Partial>
              </main>

              <Footer {...footer} />
            </div>
          </body>
        )
        : (
          <body f-client-nav className="h-full overflow-x-hidden">
            <div className="flex flex-col w-full h-full overflow-x-hidden">
              <main className="flex-1">
                <Partial name="main">
                  <ctx.Component />
                </Partial>
              </main>

              <Footer {...footer} />
            </div>
          </body>
        )}
    </html>
  );
});
