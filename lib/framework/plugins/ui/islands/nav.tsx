import type { NetzoConfig } from "../../../../framework/mod.ts";
import { type Signal, useSignal } from "../../../../deps/@preact/signals.ts";
import { cn } from "../../../../components/utils.ts";
import { buttonVariants } from "../../../../components/ui/button.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar.tsx";
import type { User } from "../../../../framework/plugins/auth/utils/db.ts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./nav-item-accordion.tsx";

type NavItemProps = NetzoConfig["ui"]["nav"]["items"][number] & {
  open: Signal<boolean>;
  toggle: () => void;
};

type NavItemUserProps = {
  sessionUser: User;
};

export function Nav({ className, ...props }: NetzoConfig["ui"]["nav"]) {
  const items: NavItemProps = props?.items?.map((item: NavItemProps) => ({
    ...item,
    open: useSignal(item?.open ?? true), // allow setting a default open state
    toggle: () => item.open.value = !item.open.value,
  }));

  return (
    <nav
      className={cn(
        "h-screen",
        // "bg-[hsl(var(--secondary))]",
        className,
      )}
    >
      {items?.map((item: NavItemProps) =>
        item?.items?.length
          ? (
            <Accordion
              type="single"
              collapsible
              className="space-y-2"
              key={item.text}
              value={item.open.value}
              onValueChange={(e) => item.open.value = e}
            >
              <AccordionItem value={item.text} className="border-none">
                <AccordionTrigger
                  className={cn(buttonVariants({ variant: "ghost" }))}
                >
                  <NavItem {...item} />
                </AccordionTrigger>
                <AccordionContent className="pb-1 pl-4 mt-2">
                  {item.items?.map((subItem) => (
                    <NavItem
                      {...subItem}
                      key={subItem.text}
                      onClick={() => subItem.open.value = false}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )
          : <NavItem {...item} onClick={() => item.open.value = false} />
      )}

      {/* IMPORTANT: disable client-side navigation for logout */}
      {props?.sessionUser && (
        <div f-client-nav={false} className="px-3 py-2">
          <NavItemUser sessionUser={props?.sessionUser} />
        </div>
      )}
    </nav>
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
        // aria-current="true" is for ancestor links, aria-current="page" is for current page
        `aria-[current='true']:text-[hsl(var(--primary))] aria-[current='page']:text-[hsl(var(--primary))]`,
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
// wrapping NavItemUser via f-client-nav={false} to avoid partials
// causing infinite redirects with auth/external middleware
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
      <Avatar className="h-9 w-9">
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

export function getInitials(sessionUser: User) {
  const { name, authId, email } = sessionUser ?? {};
  if (name) {
    const [first, last] = name.split(" ");
    return `${first[0]}${last[0]}`?.toUpperCase();
  } else if (authId) {
    return authId[0]?.toUpperCase();
  }
  return email[0]?.toUpperCase();
}