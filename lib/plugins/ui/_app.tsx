import { defineApp } from "$fresh/src/server/mod.ts";
import { buttonVariants } from "netzo/components/ui/button.tsx";
import type { NetzoState } from "../../config/mod.ts";
import { cn } from "../../components/utils.ts";
import { Head } from "./head.tsx";
import { Nav } from "./nav.tsx";
import Header from "./islands/header.tsx";
import { Footer } from "./footer.tsx";

export default defineApp<NetzoState>((_req, ctx) => {
  const { sessionId, isAuthenticated, ui = {} } = ctx.state;
  const { head, header, nav, footer } = ui;

  console.log(ui);

  return (
    <html class="h-full">
      <head>
        <Head {...head} href={ctx.url.href} />
      </head>
      <body class="h-full grid lg:grid-cols-[300px_auto]">
        <Nav {...nav} class="hidden lg:block" />

        <div class="w-full h-full overflow-x-hidden flex flex-col">
          <Header
            url={ctx.url}
            sessionUser={ctx.state.portal?.sessionUser}
            nav={ctx.state.portal?.sessionUser && nav}
          />

          <header class="flex items-center justify-between px-4 py-4">
            <div class="flex">
              {/* NOTE: use dark:filter-invert (in image.class) to invert color on dark */}
              {head?.image && (
                <img src={head?.image} class="w-auto h-12 my-auto mr-3" />
              )}
              <div class="grid">
                <h1 class="my-auto text-2xl font-semibold dark:text-white">
                  {head?.title}
                </h1>
                <p class="text-sm dark:text-gray-300">{head?.description}</p>
              </div>
            </div>
            <a
              href={isAuthenticated ? "/oauth/signout" : "/oauth/signin"}
              class={cn(
                buttonVariants({ variant: "ghost" }),
                "absolute right-4 top-4 md:right-8 md:top-8",
              )}
            >
              {isAuthenticated ? "Logout" : "Login"}
            </a>
          </header>

          <main class="flex-1">
            <ctx.Component />
          </main>

          <Footer {...footer} />
        </div>
      </body>
    </html>
  );
});
