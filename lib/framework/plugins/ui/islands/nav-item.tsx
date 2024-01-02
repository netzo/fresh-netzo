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
        buttonVariants({ variant: "ghost" }),
        "flex w-full justify-start mx-1",
        "hover:cursor-pointer hover:text-[hsl(var(--primary))]",
        // `aria-[current='true']:text-[hsl(var(--primary))]`, // ancestor links
        `aria-[current='page']:text-[hsl(var(--primary))]`, // current page
      )}
    >
      {props.item.icon && <NavItemIcon {...props} />}
      {props.item.text}
    </a>
  );
}

export function NavItemIcon({ className, ...props }: NavItemProps) {
  return props.item.icon.startsWith("http")
    ? <img src={props.item.icon} className={cn("w-5 h-5 mr-4", className)} />
    : <div className={cn(props.item.icon, "w-5 h-5 mr-4", className)} />;
}
