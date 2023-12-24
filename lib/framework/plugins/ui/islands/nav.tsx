import type { NetzoConfig } from "../../../../framework/mod.ts";
import { type Signal, useSignal } from "../../../../deps/@preact/signals.ts";
import { cn } from "../../../../components/utils.ts";
import { buttonVariants } from "../../../../components/ui/button.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar.tsx";
import type { AuthUser } from "../../../../framework/plugins/auth/utils/db.ts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./nav-item-accordion.tsx";

type NavItemProps = NetzoConfig["ui"]["nav"]["items"][number];

type NavItemUserProps = {
  sessionUser: AuthUser;
};

export function Nav({ className, ...props }: NetzoConfig["ui"]["nav"]) {
  // open all by default to let unocss SSR render all icons else hidden will be missing
  const defaultValue = props?.items?.map((_, i) => `item-${i}`);
  const open = useSignal(defaultValue);

  return (
    <div className="flex flex-col h-screen">
      <nav
        className={cn(
          "flex-1 grid gap-1 py-2 px-2",
          // "bg-[hsl(var(--secondary))]",
          className,
        )}
      >
        {props?.items?.map((item: NavItemProps, i: number) =>
          item?.items?.length
            ? (
              <Accordion
                type="multiple"
                collapsible
                className="space-y-2"
                key={item.text}
                defaultValue={defaultValue}
                value={open.value}
                onValueChange={(value) => open.value = value}
              >
                <AccordionItem value={`item-${i}`} className="border-none">
                  <AccordionTrigger
                    className={cn(buttonVariants({ variant: "ghost" }))}
                  >
                    <NavItem {...item} className="py-2" />
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pl-3 mt-2">
                    {item.items?.map((subItem) => (
                      <NavItem {...subItem} key={subItem.text} />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
            : <NavItem {...item} />
        )}
      </nav>

      {/* IMPORTANT: disable client-side navigation for logout */}
      {props?.sessionUser && (
        <div f-client-nav={false} className="px-3 py-2">
          <NavItemUser sessionUser={props?.sessionUser} />
        </div>
      )}
    </div>
  );
}

export function NavItem(props: NavItemProps) {
  return (
    <a
      href={props.href}
      target={props.target}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        `flex justify-between w-full`,
        `hover:text-[hsl(var(--primary))]`,
        props?.items?.length
          ? `aria-[current='true']:text-[hsl(var(--primary))]` // ancestor links
          : `aria-[current='page']:text-[hsl(var(--primary))]`, // current page
      )}
    >
      <div className="flex items-center flex-1 gap-2">
        {props.icon && <NavItemIcon {...props} />}
        {props.text}
      </div>
      {props?.items?.length && props.open?.value && (
        <div className="w-4 h-4 transition-transform duration-200 mdi-chevron-down shrink-0 text-muted-foreground" />
      )}
    </a>
  );
}

export function NavItemIcon(props: NavItemProps) {
  return props.icon.startsWith("http")
    ? <img src={props.icon} className="w-4 h-4 mr-2" />
    : <div className={cn(props.icon, `w-4 h-4 mr-2`)} />;
}

// IMPORTANT: disable client-side navigation for logout in component
// wrapping NavItemUser via f-client-nav={false} to avoid
// partials causing infinite redirects with auth middleware
export function NavItemUser(props: NavItemUserProps) {
  if (!props?.sessionUser) return undefined;
  return (
    <a
      href="/auth/signout"
      title="Sign out"
      className={cn(
        buttonVariants({ variant: "ghost" }),
        `h-12 px-3 py-2 flex items-center w-full hover:cursor-pointer`,
      )}
    >
      <Avatar className="mr-3 h-9 w-9">
        <AvatarImage
          src={props.sessionUser.avatar}
          alt={`@${props.sessionUser.authId}}`}
        />
        <AvatarFallback>{getInitials(props.sessionUser)}</AvatarFallback>
      </Avatar>
      <div className="w-full">
        {props.sessionUser.authId && (
          <p className="text-sm font-medium leading-none">
            {props.sessionUser.authId}
          </p>
        )}
        {props.sessionUser.email && (
          <p className="text-sm text-muted-foreground">
            {props.sessionUser.email}
          </p>
        )}
      </div>
      <div className="i-mdi-logout" />
    </a>
  );
}

// utils:

export function getInitials(sessionUser: AuthUser) {
  const { name, authId, email } = sessionUser ?? {};
  if (name) {
    const [first, last] = name.split(" ");
    return `${first[0]}${last[0]}`?.toUpperCase();
  } else if (authId) {
    return authId[0]?.toUpperCase();
  }
  return email[0]?.toUpperCase();
}
