import type { NetzoConfig } from "../../../../framework/mod.ts";
import { cn } from "../../../../components/utils.ts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../components/ui/tooltip.tsx";
import { ThemeToggle } from "../../../../components/ui/theme-toggle.tsx";
import { HeaderAuth } from "./header.auth.tsx";

export function Header({ className, ...props }: NetzoConfig["ui"]["header"]) {
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger style={{ all: "unset" }}>
                <div className="flex items-center ml-2 mdi-information text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p
                  className="text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: props.description }}
                />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* CENTER CONTENT HERE */}

      {/* RIGHT CONTENT HERE */}
      <div className="flex items-center gap-4 !my-0">
        <ThemeToggle />
        {props.sessionUser && (
          <HeaderAuth f-client-nav={false} sessionUser={props.sessionUser} />
        )}
      </div>
    </header>
  );
}
