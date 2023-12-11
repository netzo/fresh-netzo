import { cn } from "../../../../components/utils.ts";
import { buttonVariants } from "../../../../components/ui/button.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar.tsx";
import type { User } from "../../../../framework/plugins/auth/utils/db.ts";
import type { LayoutOptions } from "../mod.ts";

type NavItemProps = LayoutOptions["nav"]["items"][number];

type NavItemUserProps = {
  sessionUser: User;
};

const getInitials = (sessionUser: User) => {
  const { name, login, email } = sessionUser;
  if (name) {
    const [first, last] = name.split(" ");
    return `${first[0]}${last[0]}`?.toUpperCase();
  } else if (login) {
    return login[0]?.toUpperCase();
  }
  return email[0]?.toUpperCase();
};

export function NavItem(item: NavItemProps) {
  return (
    <div className="space-y-1">
      <a
        href={item.href}
        target={item.target}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          `justify-start w-full`,
          `hover:text-[hsl(var(--primary))]`,
          `aria-[current='page']:text-[hsl(var(--primary))]`,
        )}
      >
        {item.icon && <NavItemIcon {...item} />}
        {item.text}
      </a>
    </div>
  );
}

export function NavItemHeader(item: NavItemProps) {
  return (
    <h2 className="px-4 mb-2 text-lg font-semibold tracking-tight">
      {item.text}
    </h2>
  );
}

export function NavItemIcon(item: NavItemProps) {
  return item.icon.startsWith("http")
    ? <img src={item.icon} className="w-4 h-4 mr-2" />
    : <div className={cn(item.icon, `w-4 h-4 mr-2`)} />;
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
          alt={`@${props.sessionUser.login}}`}
        />
        <AvatarFallback>{getInitials(props.sessionUser)}</AvatarFallback>
      </Avatar>
      <div className="w-full ml-4 space-y-1">
        {props.sessionUser.login && (
          <p className="text-sm font-medium leading-none">
            {props.sessionUser.login}
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
