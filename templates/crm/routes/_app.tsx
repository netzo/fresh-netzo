import { defineApp, type FreshContext } from "$fresh/server.ts";
import type { NetzoState } from "netzo/core/mod.ts";
import { useNetzoState } from "netzo/hooks/server/use-netzo-state.ts";
import { cn } from "netzo/components/utils.ts";
import * as Layout from "netzo/components/layout/mod.ts";

export default defineApp<NetzoState>((req, ctx) => {
  const { sessionId, sessionUser, mustAuth } = useNetzoState(ctx);

  const UI = {
    head: {
      title: "CRM Template | Netzo",
      description: "A starter template for a custom CRM app",
      favicon: "/favicon.svg",
      image: "/cover.svg",
    },
    nav: {
      title: "Netzo",
      image: "/favicon.svg",
      items: [
        { text: "Overview", href: "/", icon: "mdi-view-dashboard" },
        { text: "Deals", href: "/deals", icon: "mdi-view-column" },
        {},
        { text: "Accounts", href: "/accounts", icon: "mdi-account-group" },
        { text: "Contacts", href: "/contacts", icon: "mdi-contacts" },
        { text: "Invoices", href: "/invoices", icon: "mdi-receipt" },
      ],
    },
    header: {
      title: "CRM Template",
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

          <Layout.Main mustAuth={mustAuth}>
            <ctx.Component />
          </Layout.Main>

          <Layout.Footer />
        </div>
      </body>
    </html>
  );
});
