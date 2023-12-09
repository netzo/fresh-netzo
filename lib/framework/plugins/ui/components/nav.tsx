import { cn } from "netzo/components/utils.ts";
import type { User } from "netzo/framework/plugins/portal/utils/db.ts";
import { UiOptions } from "../mod.ts";
import { NavItem, NavItemHeader, NavItemUser } from "../islands/nav-item.tsx";

export const Nav = ({ className, ...props }: UiOptions["nav"]) => {
  return (
    <div
      className={cn(
        "h-full hidden lg:flex lg:flex-col",
        "bg-[hsl(var(--secondary))]",
        "lg:border-r lg:border-[hsl(var(--border))]",
        className,
      )}
    >
      <div className="flex-1 py-4 space-y-4">
        {props?.items.map((item) => (
          <div className="px-3 py-2">
            {item?.items?.length
              ? <NavItemHeader {...item} />
              : <NavItem {...item} />}
            {item?.items?.map((item) => <NavItem {...item} />)}
          </div>
        ))}
      </div>
      <div className="px-3 py-2">
        <NavItemUser sessionUser={props?.sessionUser} />
      </div>
    </div>
  );
};
