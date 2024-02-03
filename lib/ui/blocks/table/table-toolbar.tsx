import { cn } from "../../utils.ts";
import { Button, buttonVariants } from "../../components/button.tsx";
import { Input } from "../../components/input.tsx";
import {
  type Table,
  TableDialogDelete,
  TableFacetedFilter,
  TableOptions,
  type TableProps,
  TableSheet,
} from "./table.tsx";

type TableToolbarProps<TData> = {
  table: Table<TData>;
  options: TableProps<TData, unknown>["options"];
};

export function TableToolbar<TData>({
  table,
  options,
}: TableToolbarProps<TData>) {
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
          <i className="mdi-reload w-4 h-4" />
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
            <TableFacetedFilter
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
            <i className="mdi-close w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <TableOptions table={table} />

        {selectedRows.length
          ? <TableDialogDelete options={options} selectedRows={selectedRows} />
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
              <TableSheet />
            </>
          )}
      </div>
    </div>
  );
}
