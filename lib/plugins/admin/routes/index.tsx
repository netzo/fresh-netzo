import { defineRoute, type RouteConfig } from "fresh/server.ts";
import { type AdminConfig } from "../plugin.ts";

// FIXME: not working for plugin-injected routes
// see https://github.com/denoland/fresh/issues/2296),
// https://github.com/denoland/fresh/issues/2352
// and https://github.com/denoland/fresh/pull/2297
export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};

type ModuleConfig = {
  name: string;
  description: string;
  icon: string;
  borderClass: string;
  bgClass: string;
  href: string;
};

const MODULES: ModuleConfig[] = [
  {
    name: "Users",
    description: "Manage your application's users and their permissions.",
    icon: "i-mdi-account-group",
    borderClass: "hover:border-primary",
    bgClass: "bg-primary text-primary-foreground",
    href: "/admin/users",
  },
  {
    name: "Roles",
    description: "Manage user roles and permissions for your application.",
    icon: "i-mdi-group",
    borderClass: "hover:border-accent",
    bgClass: "bg-accent text-accent-foreground",
    href: "/admin/roles",
  },
  {
    name: "Database",
    description: "Manage your SQL database and perform CRUD operations.",
    icon: "i-mdi-database",
    borderClass: "hover:border-secondary",
    bgClass: "bg-secondary text-secondary-foreground",
    href: "/admin/database",
  },
  {
    name: "Datastore",
    description: "Manage your key-value datastore for fast and efficient data storage.",
    icon: "i-mdi-file-tree",
    borderClass: "hover:border-muted",
    bgClass: "bg-muted text-muted-foreground",
    href: "/admin/datastore",
  },
  {
    name: "Storage",
    description: "Manage your object, blob, and file storage for your application.",
    icon: "i-mdi-layers-triple",
    borderClass: "hover:border-card",
    bgClass: "bg-card text-card-foreground",
    href: "/admin/storage",
  },
  {
    name: "Notifications",
    description: "Manage and send notifications to your users through various channels.",
    icon: "i-mdi-bell-badge",
    borderClass: "hover:border-ring",
    bgClass: "bg-ring text-ring-foreground",
    href: "/admin/notifications",
  },
  {
    name: "Analytics",
    description: "Gain insights into your application's usage and performance.",
    icon: "i-mdi-chart-line",
    borderClass: "hover:border-input",
    bgClass: "bg-input text-input-foreground",
    href: "/admin/analytics",
  },
  {
    name: "Crons",
    description: "Schedule and execute recurring tasks for your application.",
    icon: "i-mdi-calendar-clock",
    borderClass: "hover:border-border",
    bgClass: "bg-border text-border-foreground",
    href: "/admin/crons",
  },
];

export default (config: AdminConfig) => {
  return defineRoute((req, ctx) => {
    return (
      <div className="w-full h-full grid place-items-center p-4 bg-background overflow-y-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MODULES.map((mod) => (
            <div
              key={mod.name}
              className={`group relative overflow-hidden rounded-lg border border-border transition-all duration-300 ease-in-out ${mod.borderClass}`}
            >
              <a href={mod.href} className="absolute inset-0 z-10">
                <span className="sr-only">View {mod.name} module</span>
              </a>
              <div className="flex h-full flex-col items-center justify-center gap-4 bg-background p-6">
                <div className={`h-12 w-12 rounded-full p-2 ${mod.bgClass}`}>
                  <i className={mod.icon + " h-full w-full"} />
                </div>
                <h3 className="text-lg font-semibold">{mod.name}</h3>
                <p className="line-clamp-2 text-center text-muted-foreground">
                  {mod.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  });
};
