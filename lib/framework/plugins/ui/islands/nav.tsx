import type { NetzoConfig } from "../../../../framework/mod.ts";
import { cn } from "../../../../components/utils.ts";
import { Separator } from "../../../../components/ui/separator.tsx";
import { NavItem } from "./nav-item.tsx";

export function Nav({ className, ...props }: NetzoConfig["ui"]["nav"]) {
  return (
    <div className={cn("group flex flex-col gap-4 py-2", className)}>
      <nav className="grid gap-1 px-2">
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
