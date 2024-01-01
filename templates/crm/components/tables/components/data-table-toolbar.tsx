import { Cross2Icon, ReloadIcon } from "netzo/deps/@radix-ui/react-icons.ts";
import { Table } from "netzo/deps/@tanstack/react-table.ts";

import { cn } from "netzo/components/utils.ts";
import { Button, buttonVariants } from "netzo/components/ui/button.tsx";
import { Input } from "netzo/components/ui/input.tsx";
import { DataTableViewOptions } from "./data-table-view-options.tsx";
import { DataTableFacetedFilter } from "./data-table-faceted-filter.tsx";
import { DataTableProps } from "./data-table.tsx";
import { DialogDelete } from "@/components/tables/components/dialog-delete.tsx";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  options: DataTableProps<TData, unknown>["options"];
}

export function DataTableToolbar<TData>({
  table,
  options,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRows = table.getRowModel().rows.filter((row) =>
    row.getIsSelected()
  );
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center flex-1 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.reload()}
          className="h-8 px-2 lg:px-3"
        >
          <ReloadIcon className="w-4 h-4" />
        </Button>
        {options.search && (
          <Input
            placeholder={options.search.placeholder}
            value={(table.getColumn(options.search.column)
              ?.getFilterValue() as string) ?? ""}
            onChange={(invoice) =>
              table.getColumn(options.search.column)?.setFilterValue(
                invoice.target.value,
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
            <Cross2Icon className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />

      {selectedRows.length
        ? <DialogDelete options={options} selectedRows={selectedRows} />
        : (
          <a
            href={`/${options.resource}/new`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-8 px-2 ml-3 lg:px-3",
            )}
          >
            Create new
          </a>
        )}
    </div>
  );
}
