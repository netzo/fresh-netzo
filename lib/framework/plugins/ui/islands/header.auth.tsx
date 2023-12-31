import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar.tsx";
import { Button } from "../../../../components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu.tsx";
import type { AuthUser } from "../../../../framework/plugins/auth/utils/db.ts";

type HeaderAuthProps = {
  sessionUser: AuthUser;
};

// IMPORTANT: make sure to disable client-side navigation
// setting f-client-nav={false} at HeaderAuth to avoid
// partials causing infinite redirects with auth middleware
export function HeaderAuth(props: HeaderAuthProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={props.sessionUser.avatar}
              alt={`@${props.sessionUser.authId}}`}
            />
            <AvatarFallback>{getInitials(props.sessionUser)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {props.sessionUser.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {props.sessionUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href="/auth/signout" title="Sign out" className="w-full">
            Log out
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
