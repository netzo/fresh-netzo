import { useState } from "../../../deps/preact/hooks.ts";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table,
  useReactTable,
  VisibilityState,
} from "../../../deps/@tanstack/react-table.ts";

export type TableProps<TData = unknown, TValue = unknown> = {
  data: TData[];
  options: {
    servicePath: string;
    fieldIds: {
      // required:
      id: string;
      // options (depend on layout):
      name?: string;
      description?: string;
      column?: string;
      image?: string;
    };
    search?: {
      column: string;
      placeholder: string;
    };
    filters?: {
      column: string;
      title: string;
      options: { label: string; value: string }[];
    }[];
    layouts: {
      grid?: {};
      gallery?: {};
      kanban?: {};
    };
  };
  columns: ColumnDef<TData, TValue>[];
};

export type { Table };

export const useTable = <TData = unknown, TValue = unknown>({
  data,
  options,
  columns,
  meta = {},
}: TableProps<TData, TValue>): Table<TData> => {
  const [rowSelection, setRowSelection] = useState({});
  const [
    columnVisibility,
    setColumnVisibility,
  ] = useState<VisibilityState>({});
  const [
    columnFilters,
    setColumnFilters,
  ] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable<TData>({
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
      pagination: { pageSize: 25 },
    },
    meta,
  });

  return table;
};
