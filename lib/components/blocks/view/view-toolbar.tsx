import { Table } from "../../../deps/@tanstack/react-table.ts";
import { cn } from "../../../components/utils.ts";
import { Button, buttonVariants } from "../../ui/button.tsx";
import { Input } from "../../ui/input.tsx";
import { ViewOptions } from "./view-options.tsx";
import { ViewFacetedFilter } from "./view-faceted-filter.tsx";
import type { ViewProps } from "../../../composables/use-view.ts";
import { ViewSheet } from "./view-sheet.tsx";
import { ViewDialogDelete } from "./view-dialog-delete.tsx";

type ViewToolbarProps<TData> = {
  table: Table<TData>;
  options: ViewProps<TData, unknown>["options"];
};

export function ViewToolbar<TData>({
  table,
  options,
}: ViewToolbarProps<TData>) {
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
          <div className="mdi-reload w-4 h-4" />
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
            <ViewFacetedFilter
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
            <div className="mdi-close w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <ViewOptions table={table} />

        {selectedRows.length
          ? <ViewDialogDelete options={options} selectedRows={selectedRows} />
          : (
            <>
              <a
                href={`/${options.servicePath}/new`}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-8 px-2 ml-3 lg:px-3",
                )}
              >
                Create new
              </a>
              <ViewSheet />
            </>
          )}
      </div>
    </div>
  );
}
