import { Button } from "../../button.tsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../dropdown-menu.tsx";
import type { Table } from "./use-table.ts";

type TableOptionsProps<TData> = {
  table: Table<TData>;
};

export const LAYOUTS = {
  grid: "mdi-table",
  gallery: "mdi-view-grid",
  kanban: "mdi-view-column",
};

export function TableOptions<TData>({
  table,
}: TableOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-3 hidden lg:flex"
        >
          <i className="mdi-tune-variant h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>
          Toggle columns
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => {
                  const toggleColumn = (column) => {
                    column.toggleVisibility(!!value);
                    if (column.columns) column.columns.forEach(toggleColumn);
                  };
                  toggleColumn(column);
                }}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
