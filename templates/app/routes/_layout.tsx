import { defineLayout } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
import type { AuthState } from "netzo/plugins/auth/mod.ts";
import Header from "netzo/plugins/auth/components/Header.tsx";
import Footer from "netzo/plugins/auth/components/Footer.tsx";
import { Separator } from "netzo/components/ui/separator.tsx";
import { cn } from "netzo/components/utils.ts";

type Tab = {
  name: string;
  href: string;
} | {
  separator: true;
};

const tabs: Tab[] = [
  { name: "Clients", href: "/clients" },
  { separator: true },
  { name: "Contacts", href: "/contacts" },
  { separator: true },
  { name: "Invoices", href: "/invoices" },
];

const Nav = (props: { tabs: Tab[], url: URL }) => (
  <nav className="px-4 flex flex-wrap h-12 items-center">
    {props.tabs.map((tab) => (
      tab.separator
        ? <Separator orientation="vertical" className="h-1/2" />
        : (
          <a
            href={tab.href}
            key={tab.href}
            className={cn(
              "flex items-center px-2",
              props.url.pathname === tab.href
                ? "font-bold text-blue-500"
                : "font-medium text-muted-foreground hover:text-blue-900",
            )}
          >
            {tab.name}
          </a>
        )
    ))}
  </nav>
);

export default defineLayout<AuthState>((req, ctx) => {
  const url = new URL(req.url);

  return (
    <div class="w-full h-full flex flex-col">
      <Header
        url={ctx.url}
        sessionUser={ctx.state.auth?.sessionUser}
      />

      {ctx.state.auth?.sessionUser && <Nav tabs={tabs} url={url} />}

      <ctx.Component />

      <Footer url={ctx.url} />
    </div>
  );
});
