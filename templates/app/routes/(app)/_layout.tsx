import { defineLayout } from "$fresh/src/server/mod.ts";
import type { PortalState } from "netzo/plugins/portal/mod.ts";
import Footer from "netzo/plugins/portal/components/Footer.tsx";
import Header, { type HeaderNavItemProps } from "@/islands/Header.tsx";

const nav: HeaderNavItemProps[] = [
  { text: "Clients", href: "/clients" },
  { text: "Contacts", href: "/contacts" },
  { text: "Invoices", href: "/invoices" },
];

export default defineLayout<PortalState>((req, ctx) => {
  const url = new URL(req.url);

  return (
    <div class="w-full h-full flex flex-col">
      <Header
        url={url}
        sessionUser={ctx.state.portal?.sessionUser}
        nav={ctx.state.portal?.sessionUser && nav}
      />

      <ctx.Component />

      <Footer />
    </div>
  );
});
