import type { NetzoConfig } from "../../../../framework/mod.ts";
import { cn } from "../../../../components/utils.ts";
import { buttonVariants } from "../../../../components/ui/button.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar.tsx";
import type { AuthUser } from "../../../../framework/plugins/auth/utils/db.ts";

export type NavItemProps = NetzoConfig["ui"]["nav"]["items"][number];

export type NavItemUserProps = {
  sessionUser: AuthUser;
};

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

// IMPORTANT: make sure to disable client-side navigation
// by wrapping NavItemUser with f-client-nav={false} to avoid
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
