import type { NetzoConfig } from "../../../../framework/mod.ts";
import { cn } from "../../../../components/utils.ts";
import { Separator } from "../../../../components/ui/separator.tsx";
import { NavItem } from "./nav-item.tsx";

export function Nav({ className, ...props }: NetzoConfig["ui"]["nav"]) {
  const showNavHeader = props?.image || props?.title;
  return (
    <div className={cn("group flex flex-col gap-4", className)}>
      {showNavHeader && (
        <div>
          <div className="flex items-center p-4">
            {/* NOTE: use dark:filter-invert to invert color on dark */}
            {props?.image && (
              <img
                src={props?.image}
                class="w-auto h-9 my-auto mr-4"
              />
            )}
            <div>
              {props?.title && (
                <h2 className="text-xl font-bold">
                  {props?.title}
                </h2>
              )}
            </div>
          </div>

          <Separator />
        </div>
      )}

      <nav f-client-nav className="grid gap-1">
        {props.items.map((item, index) => {
          if ("href" in item) return <NavItem key={index} item={item} />;
          else if ("text" in item) {
            return (
              <h3
                className="mx-2 text-xs font-medium text-muted-foreground"
                key={index}
              >
                {item.text}
              </h3>
            );
          } else return <Separator key={index} />;
        })}
      </nav>
    </div>
  );
}
