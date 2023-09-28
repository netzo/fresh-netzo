import type { JSX } from "preact";
import type { NetzoModule } from "../../config.ts";
import AppLayout from "./app-layout.tsx";

export interface AppLayoutOptions extends NetzoModule {
  title?: string;
  description?: string;
  favicon?: string;
  image?: JSX.HTMLAttributes<HTMLImageElement>;
}

export const appLayout = (
  options: AppLayoutOptions = {
    title: "Built with Netzo",
    favicon: "/favicon.svg",
  },
): NetzoModule => {
  return {
    name: "appLayout",
    routes: [
      { path: "/_app", component: AppLayout(options) },
    ],
  };
};
