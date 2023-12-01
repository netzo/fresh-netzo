import { defineLayout } from "$fresh/src/server/mod.ts";
import type { PortalsState } from "netzo/plugins/portals/mod.ts";
import Footer from "netzo/plugins/portals/components/Footer.tsx";
import Header, { type HeaderNavItemProps } from "@/islands/Header.tsx";

const nav: HeaderNavItemProps[] = [
  { text: "Clients", href: "/clients" },
  { text: "Contacts", href: "/contacts" },
  { text: "Invoices", href: "/invoices" },
];

export default defineLayout<PortalsState>((req, ctx) => {
  const url = new URL(req.url);

  return (
    <div class="w-full h-full flex flex-col">
      <Header
        url={url}
        sessionUser={ctx.state.portals?.sessionUser}
        nav={ctx.state.portals?.sessionUser && nav}
      />

      <ctx.Component />

      <Footer />
    </div>
  );
});
