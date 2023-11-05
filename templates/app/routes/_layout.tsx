import { defineLayout } from "$fresh/server.ts";
import { Separator } from "netzo/components/ui/separator.tsx";
import { cn } from "netzo/components/utils.ts";

const tabs = [
  { name: "Clients", href: "/clients" },
  { separator: true },
  { name: "Contacts", href: "/contacts" },
  { separator: true },
  { name: "Invoices", href: "/invoices" },
  { separator: true },
];

export default defineLayout((req, ctx) => {
  const url = new URL(req.url);

  return (
    <html className="overflow-x-hidden">
      <head>
        <link rel="stylesheet" href="/shadcn-ui.css" />
      </head>
      <body>
        <div className="px-4 flex flex-wrap h-12 items-center">
          {tabs.map((tab) => (
            tab.separator
              ? <Separator orientation="vertical" className="h-1/2" />
              : (
                <a
                  href={tab.href}
                  key={tab.href}
                  className={cn(
                    "flex items-center px-2",
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
        <ctx.Component />
      </body>
    </html>
  );
});
