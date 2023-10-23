import { Cross2Icon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "netzo/components/ui/button.tsx";
import { Input } from "netzo/components/ui/input.tsx";
import { DataTableViewOptions } from "./data-table-view-options.tsx";

import { DataTableFacetedFilter } from "./data-table-faceted-filter.tsx";
import { DataTableProps } from "./data-table.tsx";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  options: DataTableProps<TData, unknown>["options"];
}

export function DataTableToolbar<TData>({
  table,
  options,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {options.search && (
          <Input
            placeholder={options.search.placeholder}
            value={(table.getColumn(options.search.column)
              ?.getFilterValue() as string) ?? ""}
            onChange={(solar) =>
              table.getColumn(options.search.column)?.setFilterValue(
                solar.target.value,
              )}
            className="h-8 w-[150px] lg:w-[250px]"
            autocomplete="off"
          />
        )}

        {options.filters?.map(({ column, title, options }) =>
          table.getColumn(column) && (
            <DataTableFacetedFilter
              column={table.getColumn(column)}
              title={title}
              options={options}
            />
          )
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />

      {options.button && table.getFilteredSelectedRowModel().rows.length
        ? (
          <Button
            className="ml-3 h-8 px-2 lg:px-3"
            {...options.button}
          >
            <Pencil1Icon className="mr-2 h-4 w-4" />
            Editar seleccion ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        )
        : (
          <Button
            className="ml-3 h-8 px-2 lg:px-3"
            {...options.button}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            {options.button.text}
          </Button>
        )}
    </div>
  );
}
