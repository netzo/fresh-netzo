import { defineLayout } from "$fresh/server.ts";
import type { AuthState } from "netzo/plugins/auth/mod.ts";
import Footer from "netzo/plugins/auth/components/Footer.tsx";
import Header, { type HeaderNavItemProps } from "@/islands/Header.tsx";

const nav: HeaderNavItemProps[] = [
  { text: "Clients", href: "/clients" },
  { text: "Contacts", href: "/contacts" },
  { text: "Invoices", href: "/invoices" },
];

export default defineLayout<AuthState>((req, ctx) => {
  const url = new URL(req.url);

  console.log("ctx.state", ctx.state);

  return (
    <div class="w-full h-full flex flex-col">
      <Header
        url={url}
        sessionUser={ctx.state.auth?.sessionUser}
        nav={ctx.state.auth?.sessionUser && nav}
      />

      <ctx.Component />

      <Footer />
    </div>
  );
});
