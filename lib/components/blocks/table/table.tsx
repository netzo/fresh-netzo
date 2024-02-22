import { TablePagination } from "./table-pagination.tsx";
import { TableToolbar } from "./table-toolbar.tsx";
import { Grid } from "./table.grid.tsx";
import { type TableProps, useTable } from "./use-table.ts";

export * from "./table-column-cell.tsx";
export * from "./table-column-header.tsx";
export * from "./table-faceted-filter.tsx";
export * from "./table-options.tsx";
export * from "./table-pagination.tsx";
export * from "./table-row-actions.tsx";
export * from "./table-toolbar.tsx";
export * from "./use-table.ts";

export function Table<TData, TValue>({
  data,
  options,
}: TableProps<TData, TValue>) {
  const table = useTable<TData, TValue>({ data, options });

  return (
    <div className="space-y-4">
      <TableToolbar options={options} table={table} />
      <div className="border rounded-md">
        <Grid data={data} options={options} table={table} />
      </div>
      <TablePagination table={table} />
    </div>
  );
}
