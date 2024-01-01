import type { NetzoConfig } from "../../../../framework/mod.ts";
import { cn } from "../../../../components/utils.ts";
import { buttonVariants } from "../../../../components/ui/button.tsx";

export type NavItemProps = NetzoConfig["ui"]["nav"]["items"][number];

export function NavItem(props: NavItemProps) {
  return (
    <a
      key={props.item.key}
      href={props.item.href}
      target={props.target}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "flex w-full justify-start",
        "hover:cursor-pointer hover:text-[hsl(var(--primary))]",
        // `aria-[current='true']:text-[hsl(var(--primary))]`, // ancestor links
        `aria-[current='page']:text-[hsl(var(--primary))]`, // current page
      )}
    >
      {/* <item.icon className="w-4 h-4 mr-2" /> */}
      {props.item.icon && <NavItemIcon {...props} className="w-4 h-4 mr-2" />}
      {props.item.text}
    </a>
  );
}

export function NavItemIcon(props: NavItemProps) {
  return props.item.icon.startsWith("http")
    ? <img src={props.item.icon} className="w-4 h-4 mr-2" />
    : <div className={cn(props.item.icon, `w-4 h-4 mr-2`)} />;
}
