import { Partial } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { cn } from "netzo/components/utils.ts";
import { type NetzoState } from "netzo/mod.ts";
import { useAuth } from "netzo/plugins/auth/plugin.ts";
import * as Layout from "../islands/mod.ts";

export default defineApp<NetzoState>((req, ctx) => {
  const { sessionId, sessionUser, mustAuth } = useAuth(ctx);

  const HEAD = {
    title: "Company CRM",
    description: "A starter template for a custom CRM app",
    favicon: "/favicon.svg",
    image: "/cover.svg",
  };

  const HEADER = {
    title: HEAD.title,
    description: HEAD.description,
    sessionUser,
  };

  const NAV = {
    title: "Netzo",
    image: "/logo.svg",
    items: [
      [
        {
          text: "Dashboard",
          href: "/",
          icon: "mdi-view-dashboard",
          exact: true,
        },
        { text: "Deals", href: "/deals", icon: "mdi-tag" },
        {},
        { text: "Accounts", href: "/accounts", icon: "mdi-storefront" },
        { text: "Contacts", href: "/contacts", icon: "mdi-contacts" },
        // { text: "Quotes", href: "/quotes", icon: "mdi-file-document" },
      ],
      [
        {
          text: "Feedback",
          href:
            "https://github.com/netzo/netzo/issues/new?title=[templates/crm]%20general%20feedback",
          target: "_blank",
          icon: "mdi-comment-question",
        },
        {
          text: "Open in GitHub",
          href: "https://github.com/netzo/netzo/tree/main/templates/crm",
          target: "_blank",
          icon: "mdi-github",
        },
      ],
    ],
  };

  return (
    <html className="h-full overflow-hidden">
      <head>
        <Layout.Head {...HEAD} />
      </head>
      <body
        className={cn(
          "h-full bg-background",
          !mustAuth && "md:grid md:grid-cols-[250px_auto]",
        )}
      >
        {!mustAuth && <Layout.Nav {...NAV} />}
        <div className="flex flex-col w-full h-full overflow-x-hidden">
          <Layout.Header {...HEADER} />

          <main className="flex-1">
            {mustAuth ? <ctx.Component /> : (
              <Partial name="main">
                <ctx.Component />
              </Partial>
            )}
          </main>
        </div>
      </body>
    </html>
  );
});
