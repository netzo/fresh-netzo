import { useState } from "../deps/preact/hooks.ts";
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
  Table as View,
  useReactTable as useReactView,
  VisibilityState,
} from "../deps/@tanstack/react-table.ts";
import { UseApiClientOptions } from "./use-api-client.ts";

export type ViewProps<TData = unknown, TValue = unknown> = {
  client: UseApiClientOptions;
  data: TData[];
  options: {
    servicePath: string;
    fieldIds: {
      // required:
      id: string;
      // kanban:
      name?: string;
      description?: string;
      column?: string;
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
  };
  columns: ColumnDef<TData, TValue>[];
};

export type { View };

export const useView = <TData = unknown, TValue = unknown>({
  data,
  options,
  columns,
}: ViewProps<TData, TValue>): View<TData> => {
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

  const view = useReactView<TData>({
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

  return view;
};
