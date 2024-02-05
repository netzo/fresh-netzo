import { type JSX } from "preact";
import { Column } from "../../../deps/@tanstack/react-table.ts";
import { cn } from "../../utils.ts";
import { Button } from "../../button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../dropdown-menu.tsx";

type TableColumnHeaderProps<TData, TValue> =
  & JSX.HTMLAttributes<HTMLDivElement>
  & {
    column: Column<TData, TValue>;
    title: string;
  };

export function TableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: TableColumnHeaderProps<TData, TValue>) {
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
            className="w-full h-full rounded-none bg-inherit justify-between"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc"
              ? <i className="mdi-arrow-down w-4 h-4 ml-2" />
              : column.getIsSorted() === "asc"
              ? <i className="mdi-arrow-up w-4 h-4 ml-2" />
              : <i className="mdi-unfold-more-horizontal w-4 h-4 ml-2" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <i className="mdi-arrow-up mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <i className="mdi-arrow-down mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
