import type { JSX } from "../../deps/preact.ts";
import { cn } from "../../components/utils.ts";
import { ThemeToggle } from "../../components/ui/theme-toggle.tsx";
import { useUI } from "../../composables/use-ui.ts";
import { HeaderAuth } from "./header.auth.tsx";
import type { UiConfig } from "../plugin.ts";
import type { HeaderAuthProps } from "./header.auth.tsx";

export type HeaderProps =
  & JSX.HTMLAttributes<HTMLDivElement>
  & UiConfig["header"]
  & HeaderAuthProps;

export function Header({ className, ui = {}, ...props }: HeaderProps) {
  const { root, title, description, image, left, right } = useUI(ui, {
    root: {
      className: cn(
        "flex items-center justify-between p-4 space-y-2 bg-[hsl(var(--background))]",
        className,
      ),
    },
    title: { className: "text-xl font-bold" },
    description: {
      className:
        "flex items-center ml-2 text-sm mdi-information text-muted-foreground",
    },
    image: { className: "w-auto h-9 my-auto mr-4" },
    left: { className: "flex items-center gap-4 !my-auto" },
    right: { className: "flex items-center gap-4 !my-auto" },
  });

  return (
    <header {...root}>
      <div {...left}>
        {props.children}
        {/* NOTE: use dark:filter-invert to invert color on dark */}
        {props?.image && <img {...image} src={props?.image} />}
        {props?.title && <h1 {...title}>{props.title}</h1>}
        {props?.description && (
          <div {...description} title={props.description} />
        )}
      </div>

      <div {...right}>
        <ThemeToggle />
        <HeaderAuth f-client-nav={false} sessionUser={props.sessionUser} />
      </div>
    </header>
  );
}
