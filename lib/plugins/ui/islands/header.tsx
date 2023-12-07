import { cn } from "netzo/components/utils.ts";
import type { User } from "netzo/plugins/portal/utils/db.ts";
import { UiOptions } from "../mod.ts";

export default ({ className, ...props }: UiOptions["header"]) => {
  return (
    <header
      className={cn(
        "flex items-center justify-between px-4 py-4 space-y-2 bg-[hsl(var(--background))]",
        className,
      )}
    >
      <div className="flex items-center">
        {/* NOTE: use dark:filter-invert to invert color on dark */}
        {props?.image && (
          <img
            src={props?.image}
            class="w-auto h-10 my-auto mr-4"
          />
        )}
        <div>
          {props?.title && (
            <h1 className="text-2xl font-bold tracking-tight">
              {props?.title}
            </h1>
          )}
          {props?.description && (
            <p className="text-sm text-muted-foreground">
              {props?.description}
            </p>
          )}
        </div>
      </div>

      {/* CENTER CONTENT HERE */}

      {/* RIGHT CONTENT HERE */}
    </header>
  );
};
