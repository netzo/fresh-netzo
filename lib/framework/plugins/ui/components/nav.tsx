import type { NetzoConfig } from "../../../../framework/mod.ts";
import { cn } from "../../../../components/utils.ts";
import { NavItem, NavItemHeader, NavItemUser } from "../islands/nav-item.tsx";

export const Nav = (
  { className, ...props }: NetzoConfig["ui"]["nav"],
) => {
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
      {/* IMPORTANT: disable client-side navigation for logout */}
      {props?.sessionUser && (
        <div f-client-nav={false} className="px-3 py-2">
          <NavItemUser sessionUser={props?.sessionUser} />
        </div>
      )}
    </div>
  );
};
