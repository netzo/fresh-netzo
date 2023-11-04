import { defineLayout } from "$fresh/server.ts";
import { Separator } from "netzo/components/ui/separator.tsx";
import { cn } from "netzo/components/utils.ts";
import { buttonVariants } from "netzo/components/ui/button.tsx";
import { NetzoState } from "netzo/config/mod.ts";

const tabs = [
  { name: "Hidráulica", href: "/hydro" },
  { separator: true },
  { name: "Eólica", href: "/wind" },
  { separator: true },
  { name: "Solar", href: "/solar" },
];

const meta = {
  title: "Admin Panel",
  description: "Herramienta de administración y gestion",
  favicon:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi-vXRSWKKnrGxki2DRNUfFrB4W_SUPoGAoPVJx7BCJoEgxUosgHczuX6C7PX3gaCk0RQ&usqp=CAU",
  image: {
    src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi-vXRSWKKnrGxki2DRNUfFrB4W_SUPoGAoPVJx7BCJoEgxUosgHczuX6C7PX3gaCk0RQ&usqp=CAU",
    // class: "dark:filter-invert",
  },
};

export default defineLayout<NetzoState>((req, ctx) => {
  const url = new URL(req.url);
  console.log("STATE", ctx.state)
  const { sessionId, isAuthenticated, options } = ctx.state?.auth;

  return (
    <html className="w-[100dvw] h-[100dvh]">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="icon" type="image/svg+xml" href={meta.favicon} />
        <link rel="stylesheet" href="/shadcn-ui.css" />
      </head>
      <body class="flex flex-col n-bg-base" un-cloak>
        <main
          class={`flex-1 overflow-x-hidden ${
            isAuthenticated ? "h-[calc(100%-84px)]" : "h-full"
          }`}
        >
          {isAuthenticated && (
            <>
              <header class="flex justify-between items-center py-4 px-4">
                <div class="flex">
                  {/* NOTE: use dark:filter-invert (in image.class) to invert color on dark */}
                  {meta.image?.src && (
                    <img
                      {...meta.image}
                      class={cn("w-auto h-12 my-auto mr-3", meta.image.class)}
                    />
                  )}
                  <div class="grid">
                    <h1 class="my-auto text-2xl font-semibold dark:text-white">
                      {meta.title}
                    </h1>
                    <p class="text-sm dark:text-gray-300">{meta.description}</p>
                  </div>
                </div>
                {/* <a href="https://netzo.io" target="_blank">
                  <Logo class="w-auto h-8" />
                </a> */}
                <a
                  href={isAuthenticated ? "/oauth/signout" : "/oauth/signin"}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute right-4 top-4 md:right-8 md:top-8",
                  )}
                >
                  {isAuthenticated ? "Logout" : "Login"}
                </a>
              </header>
              <div className="px-4 flex items-center w-full overflow-x-auto h-12">
                {tabs.map((tab) => (
                  tab.separator
                    ? <Separator orientation="vertical" className="h-1/2" />
                    : (
                      <a
                        href={tab.href}
                        key={tab.href}
                        className={cn(
                          "flex items-center px-4",
                          url.pathname === tab.href
                            ? "font-bold text-blue-500"
                            : "font-medium text-muted-foreground hover:text-blue-900",
                        )}
                      >
                        {tab.name}
                      </a>
                    )
                ))}
              </div>
            </>
          )}
          <ctx.Component />
        </main>
      </body>
    </html>
  );
});
