// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import { Button } from "../../button.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../../dropdown-menu.tsx";

export function TableRowActions<TData>(props: { children?: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 mx-auto p-0 data-[state=open]:bg-muted"
        >
          <i className="mdi-dots-horizontal h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {props.children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
