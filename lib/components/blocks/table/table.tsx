import { signal } from "../../../deps/@preact/signals.ts";
import { TablePagination } from "./table-pagination.tsx";
import { TableToolbar } from "./table-toolbar.tsx";
import { Grid } from "../grid/grid.tsx";
import { type TableProps, useTable } from "./use-table.ts";

export * from "./table-column-cell.tsx";
export * from "./table-column-header.tsx";
export * from "./table-faceted-filter.tsx";
export * from "./table-options.tsx";
export * from "./table-options.tsx";
export * from "./table-pagination.tsx";
export * from "./table-row-actions.tsx";
export * from "./table-toolbar.tsx";
export * from "./use-table.ts";

export const layout = signal("grid");

// TODO: finalize the Table component which would allow cycling between layouts
export function Table<TData, TValue>({
  data,
  options,
  columns,
}: TableProps<TData, TValue>) {
  const table = useTable<TData, TValue>({ data, options, columns });

  return (
    <div className="space-y-4">
      <TableToolbar table={table} options={options} />
      {["grid"].includes(layout.value) && (
        <div className="border rounded-md">
          <Grid
            table={table}
            data={data}
            options={options}
            columns={columns}
          />
        </div>
      )}
      {["gallery"].includes(layout.value) && (
        <Grid
          table={table}
          data={data}
          options={options}
          columns={columns}
        />
      )}
      {["kanban"].includes(layout.value) && (
        <div className="flex-1">
          <Kanban table={table} options={options} />
        </div>
      )}
      <TablePagination table={table} />
    </div>
  );
}
