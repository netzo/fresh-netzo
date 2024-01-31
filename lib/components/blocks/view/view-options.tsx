import { DropdownMenuTrigger } from "../../../deps/@radix-ui/react-dropdown-menu.ts";
import { MixerHorizontalIcon } from "../../../deps/@radix-ui/react-icons.ts";
import { Table } from "../../../deps/@tanstack/react-table.ts";
import { Button } from "../../ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../ui/dropdown-menu.tsx";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group.tsx";

interface TableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function TableViewOptions<TData>({
  table,
}: TableViewOptionsProps<TData>) {
  return (
    <>
      <ToggleGroup type="single" size="sm">
        <ToggleGroupItem
          value="table"
          aria-label="Toggle table"
        >
          <div className="mdi-table h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="grid"
          aria-label="Toggle grid"
        >
          <div className="mdi-view-column h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="kanban"
          aria-label="Toggle kanban"
        >
          <div className="mdi-view-comfy h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-3 hidden lg:flex"
          >
            <div className="mdi-tune-variant h-4 w-4" />
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
