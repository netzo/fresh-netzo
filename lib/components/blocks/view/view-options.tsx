import { signal } from "../../../deps/@preact/signals.ts";
import { Table } from "../../../deps/@tanstack/react-table.ts";
import { cn } from "../../utils.ts";
import { Button } from "../../ui/button.tsx";
import { layout } from "../view/view.tsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu.tsx";

type ViewOptionsProps<TData> = {
  table: Table<TData>;
};

export const layout = signal("table");

export const LAYOUTS = {
  table: "mdi-table",
  grid: "mdi-view-comfy",
  kanban: "mdi-view-column",
};

export function ViewOptions<TData>({
  table,
}: ViewOptionsProps<TData>) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-3 hidden lg:flex"
          >
            <div className={cn("h-4 w-4", LAYOUTS[layout.value])} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>View Layout</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={layout.value}
            onValueChange={(e) => layout.value = e}
          >
            <DropdownMenuRadioItem value="table">
              Table
              <div className={cn("h-4 w-4", LAYOUTS.table)} />
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="grid">
              Grid
              <div className={cn("h-4 w-4", LAYOUTS.grid)} />
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="kanban">
              <div className={cn("h-4 w-4", LAYOUTS.kanban)} />
              Kanban
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

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
    </>
  );
}
