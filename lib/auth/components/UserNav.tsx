import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/ui/avatar.tsx";
import { Button } from "netzo/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "netzo/components/ui/dropdown-menu.tsx";
import type { User } from "netzo/auth/utils/db.ts";
import type { HeaderProps } from "netzo/auth/components/Header.tsx";

export function UserNav(props: HeaderProps) {
  if (!props.sessionUser) return undefined;
  return (<div>{props.sessionUser}</div>)
  // return (
  //   <DropdownMenu>
  //     <DropdownMenuTrigger asChild>
  //       <Button variant="ghost" className="relative h-8 w-8 rounded-full">
  //         <Avatar className="h-9 w-9">
  //           <AvatarImage
  //             src={props.sessionUser?.avatar}
  //             alt={`@${props.sessionUser.login}}`}
  //           />
  //           <AvatarFallback>SC</AvatarFallback>
  //         </Avatar>
  //       </Button>
  //     </DropdownMenuTrigger>
  //     <DropdownMenuContent className="w-56" align="end" forceMount>
  //       <DropdownMenuLabel className="font-normal">
  //         <div className="flex flex-col space-y-1">
  //           <p className="text-sm font-medium leading-none">
  //           {props.sessionUser.login}
  //           </p>
  //           <p className="text-xs leading-none text-muted-foreground">
  //           {props.sessionUser?.email}
  //           </p>
  //         </div>
  //       </DropdownMenuLabel>
  //       {/* <DropdownMenuSeparator />
  //       <DropdownMenuGroup>
  //         <DropdownMenuItem>
  //           Profile
  //           <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
  //         </DropdownMenuItem>
  //         <DropdownMenuItem>
  //           Settings
  //           <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
  //         </DropdownMenuItem>
  //       </DropdownMenuGroup>
  //       <DropdownMenuSeparator /> */}
  //       <DropdownMenuItem>
  //         Log out
  //         <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
  //       </DropdownMenuItem>
  //     </DropdownMenuContent>
  //   </DropdownMenu>
  // );
}
