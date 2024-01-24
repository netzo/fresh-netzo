import type { JSX } from "../../../../deps/preact.ts";
import { cn } from "../../../../components/utils.ts";
import { ThemeToggle } from "../../../../components/ui/theme-toggle.tsx";
import { HeaderAuth } from "./header.auth.tsx";
import type { UiConfig } from "../mod.ts";
import type { HeaderAuthProps } from "./header.auth.tsx";

export type HeaderProps =
  & JSX.HTMLAttributes<HTMLDivElement>
  & UiConfig["header"]
  & HeaderAuthProps;

export function Header({ className, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between p-4 space-y-2 bg-[hsl(var(--background))]",
        className,
      )}
    >
      <div className="flex items-center">
        {props.children}
        {/* NOTE: use dark:filter-invert to invert color on dark */}
        {props?.image && (
          <img
            src={props?.image}
            class="w-auto h-9 my-auto mr-4"
          />
        )}
        {props?.title && (
          <h1 className="text-xl font-bold">
            {props.title}
          </h1>
        )}
        {props?.description && (
          <div
            title={props.description}
            className="flex items-center ml-2 text-sm mdi-information text-muted-foreground"
          />
        )}
      </div>

      {/* CENTER CONTENT HERE */}

      {/* RIGHT CONTENT HERE */}
      <div className="flex items-center gap-4 !my-0">
        <ThemeToggle />
        <HeaderAuth sessionUser={props.sessionUser} />
        {/* DISABLED: <HeaderAuth f-client-nav={false} sessionUser={props.sessionUser} /> */}
      </div>
    </header>
  );
}
