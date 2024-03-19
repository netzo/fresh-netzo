import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnSort,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  type RowSelectionState,
  type SortingState,
  type Table as TTable,
  useReactTable,
  type VisibilityState,
} from "../../../deps/@tanstack/react-table.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../table.tsx";
import { cn } from "../../utils.ts";
import type { TableFilter } from "./table-filters.tsx";
import type { TableSearch } from "./table-search.tsx";

export * from "../../../deps/@tanstack/react-table.ts";
export * from "./table-actions.tsx";
export * from "./table-column-cell.tsx";
export * from "./table-column-header.tsx";
export * from "./table-filters.tsx";
export * from "./table-pagination.tsx";
export * from "./table-row-actions.tsx";
export * from "./table-search.tsx";
export * from "./table-view-options.tsx";

export type UseTableOptions<TData = unknown> = {
  search?: TableSearch;
  sorting?: ColumnSort[];
  filters?: TableFilter<TData, unknown>[];
  columns: ColumnDef<TData, unknown>[];
};

declare module "../../../deps/@tanstack/react-table.ts" {
  // deno-lint-ignore no-empty-interface
  interface TableMeta<TData extends RowData> extends UseTableOptions<TData> {}
}

export function useTable<TData = unknown>(
  data: TData[],
  options: UseTableOptions<TData>,
): TTable<TData> & {
  Component: (props: { table: TTable<TData> }) => JSX.Element;
} {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [
    columnVisibility,
    setColumnVisibility,
  ] = useState<VisibilityState>({});
  const [
    columnFilters,
    setColumnFilters,
  ] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>(options.sorting ?? []);

  const table = useReactTable<TData>({
    data,
    columns: options.columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    initialState: {
      pagination: { pageSize: 25 },
    },
    meta: options,
  });

  return table;
}

export function TableView<TData = unknown>({ table, children }: {
  table: TTable<TData>;
  children?: (table: TTable<TData>) => ComponentChildren;
}) {
  if (children) return children(table);
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  className="text-center border-r"
                >
                  {header.isPlaceholder ? null : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length
          ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-#dddddd/50 data-[state=selected]:bg-#dddddd dark:hover:bg-#333333/50 dark:data-[state=selected]:bg-#333333"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cn("py-1")}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )
          : (
            <TableRow>
              <TableCell className="h-24 text-center col-span-full">
                No results.
              </TableCell>
            </TableRow>
          )}
      </TableBody>
    </Table>
  );
}
