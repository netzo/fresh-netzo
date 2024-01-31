import { useState } from "../../../deps/preact/hooks.ts";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "../../../deps/@tanstack/react-table.ts";
import { TablePagination } from "../view/view-pagination.tsx";
import { TableToolbar } from "../view/view-toolbar.tsx";
import { Table } from "../table/table.tsx";

export type TableProps<TData = unknown, TValue = unknown> = {
  data: TData[];
  options: {
    servicePath: string;
    search?: {
      column: string;
      placeholder: string;
    };
    filters?: {
      column: string;
      title: string;
      options: { label: string; value: string }[];
    }[];
  };
  columns: ColumnDef<TData, TValue>[];
  views: [];
};

export function View<TData, TValue>({
  columns,
  data,
  options,
}: TableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<
    VisibilityState
  >({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
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
      pagination: { pageSize: 10 },
    },
  });

  return (
    <div className="space-y-4">
      <TableToolbar
        table={table}
        options={options}
      />
      <div className="border rounded-md">
        <Table
          table={table}
          columns={columns}
        />
      </div>
      <TablePagination table={table} />
    </div>
  );
}
