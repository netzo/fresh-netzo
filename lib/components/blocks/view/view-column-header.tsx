import { type JSX } from "preact";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "../../../deps/@radix-ui/react-icons.ts";
import { Column } from "../../../deps/@tanstack/react-table.ts";
import { cn } from "../../../components/utils.ts";
import { Button } from "../../ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu.tsx";

type ViewColumnHeaderProps<TData, TValue> =
  & JSX.HTMLAttributes<HTMLDivElement>
  & {
    column: Column<TData, TValue>;
    title: string;
  };

export function ViewColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: ViewColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("h-full flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-full rounded-none bg-inherit"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc"
              ? <ArrowDownIcon className="w-4 h-4 ml-2" />
              : column.getIsSorted() === "asc"
              ? <ArrowUpIcon className="w-4 h-4 ml-2" />
              : <CaretSortIcon className="w-4 h-4 ml-2" />}
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
