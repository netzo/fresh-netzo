import type { Table } from "../table.tsx";

export const useTablePagination = <TData extends Record<string, unknown>>(
  table: Table<TData>,
) => {
  const { pageIndex, pageSize } = table.getState().pagination;
  const from = pageIndex * pageSize + 1;
  const to = from + pageSize - 1;
  const total = table.getFilteredRowModel().rows.length;
  return { pageIndex, pageSize, from, to, total };
};
