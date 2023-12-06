import { cn } from "netzo/components/utils.ts";
import { Button } from "netzo/components/ui/button.tsx";
import { UIOptions } from "./mod.ts";

type NavProps = React.HTMLAttributes<HTMLDivElement> & UIOptions["nav"];

type NavItemProps = UIOptions["nav"]["items"][number];

export const Nav = ({ className, ...nav }: NavProps) => {
  return (
    <div className={cn("h-full", className)}>
      <div className="py-4 space-y-4">
        {nav?.items.map((item) => (
          <div className="px-3 py-2">
            {item?.header ? <NavItemHeader {...item} /> : <NavItem {...item} />}
            {item?.items?.map((item) => <NavItem {...item} />)}
          </div>
        ))}
      </div>
    </div>
  );
};

export function NavItem(item: NavItemProps) {
  return (
    <div className="space-y-1">
      <a
        href={item.href}
        target={item.target}
      >
        <Button variant="secondary" className="justify-start w-full">
          {item.icon && <NavItemIcon {...item} />}
          {item.text}
        </Button>
      </a>
    </div>
  );
}

export function NavItemHeader(item: NavItemProps) {
  return (
    <h2 className="px-4 mb-2 text-lg font-semibold tracking-tight">
      {item.header}
    </h2>
  );
}

export function NavItemIcon(item: NavItemProps) {
  return (
    <img
      src={item.icon}
      className="w-4 h-4 mr-2"
    />
  );
}
