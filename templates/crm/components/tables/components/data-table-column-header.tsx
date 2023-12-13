import { type JSX } from "preact";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "netzo/deps/@radix-ui/react-icons.ts";
import { Column } from "netzo/deps/@tanstack/react-table.ts";

import { cn } from "netzo/components/utils.ts";
import { Button } from "netzo/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "netzo/components/ui/dropdown-menu.tsx";

interface DataTableColumnHeaderProps<TData, TValue>
  extends JSX.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc"
              ? <ArrowDownIcon className="ml-2 h-4 w-4" />
              : column.getIsSorted() === "asc"
              ? <ArrowUpIcon className="ml-2 h-4 w-4" />
              : <CaretSortIcon className="ml-2 h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
