import type { NetzoConfig } from "../../../../framework/mod.ts";
import { cn } from "../../../../components/utils.ts";
import { Separator } from "../../../../components/ui/separator.tsx";
import { NavItem } from "./nav-item.tsx";

export function Nav({ className, ...props }: NetzoConfig["ui"]["nav"]) {
  return (
    <div
      className={cn(
        "group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2",
        className,
      )}
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:px-2">
        {props.items.map((item, index) => {
          if (item.header) {
            return <h3 key={index}>{item.header}</h3>;
          } else if (item.separator) {
            return <Separator key={index} />;
          } else return <NavItem key={index} item={item} />;
        })}
      </nav>
    </div>
  );
}
