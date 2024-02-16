import { Partial } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { cn } from "netzo/components/utils.ts";
import { type NetzoState } from "netzo/mod.ts";
import { useAuth } from "netzo/plugins/auth/plugin.ts";
import * as Layout from "../islands/mod.ts";

export default defineApp<NetzoState>((req, ctx) => {
  const { sessionId, sessionUser, mustAuth } = useAuth(ctx);

  const UI = {
    head: {
      title: "Company CRM",
      description: "A starter template for a custom CRM app",
      favicon: "/favicon.svg",
      image: "/cover.svg",
    },
    nav: {
      title: "Netzo",
      image: "/logo.svg",
      items: [
        [
          { text: "Dashboard", href: "/", icon: "mdi-view-dashboard" },
          {
            text: "Recent Activity",
            href: "/interactions",
            icon: "mdi-history",
          },
          {},
          { text: "Deals", href: "/deals", icon: "mdi-tag" },
          {
            text: "Transactions",
            href: "/transactions",
            icon: "mdi-currency-usd",
          },
          {},
          { text: "Accounts", href: "/accounts", icon: "mdi-account-group" },
          { text: "Contacts", href: "/contacts", icon: "mdi-contacts" },
          { text: "Invoices", href: "/invoices", icon: "mdi-receipt" },
        ],
        [
          {
            text: "Feedback",
            href:
              "https://github.com/netzo/netzo/issues/new?title=[templates/crm]%20general%20feedback",
            target: "_blank",
            icon: "mdi-comment-question",
          },
        ],
      ],
    },
    header: {
      title: "Company CRM",
      description: "A starter template for a custom CRM app",
      sessionUser,
    },
  };

  return (
    <html className="h-full overflow-hidden">
      <head>
        <Layout.Head {...UI.head} />
      </head>
      <body
        className={cn(
          "h-full bg-background",
          !mustAuth && "md:grid md:grid-cols-[250px_auto]",
        )}
      >
        {!mustAuth && (
          <Layout.Nav
            {...UI.nav}
            className="hidden md:flex w-[250px] md:b-r-1"
          />
        )}
        <div className="flex flex-col w-full h-full overflow-x-hidden">
          <Layout.Header {...UI.header}>
            {!mustAuth && (
              <Layout.NavMobile {...UI.nav} className="flex md:hidden" />
            )}
          </Layout.Header>

          <main className="flex-1">
            {mustAuth ? <ctx.Component /> : (
              <Partial name="main">
                <ctx.Component />
              </Partial>
            )}
          </main>

          <Layout.Footer />
        </div>
      </body>
    </html>
  );
});
