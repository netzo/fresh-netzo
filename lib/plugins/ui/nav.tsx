import { cn } from "netzo/components/utils.ts";
import type { User } from "netzo/plugins/portal/utils/db.ts";
import { UIOptions } from "./mod.ts";
import { NavItem, NavItemHeader, NavItemUser } from "./islands/nav-item.tsx";

export type NavProps =
  & React.HTMLAttributes<HTMLDivElement>
  & UIOptions["nav"]
  & {
    sessionUser?: User;
  };

export const Nav = ({ className, ...props }: NavProps) => {
  return (
    <div
      className={cn(
        "h-full hidden lg:flex lg:flex-col lg:border-r lg:border-[hsl(var(--border))]",
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
      <NavItemUser sessionUser={props?.sessionUser} />
    </div>
  );
};
