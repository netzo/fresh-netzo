import { Button } from "../../button.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select.tsx";
import { cn } from "../../utils.ts";
import { useTablePagination } from "./hooks/use-table-pagination.ts";
import type { Table } from "./table.tsx";

export function TablePagination<TData>({
  table,
}: JSX.IntrinsicElements["button"] & { table: Table<TData> }) {
  const { pageIndex, pageSize, from, to, total } = useTablePagination(table);
  return (
    <div className="flex flex-wrap gap-y-2 gap-x- items-center justify-between">
      <TablePaginationPageRange table={table} className="flex-1" />
      <TablePaginationPageSize table={table} />
      <TablePaginationPageCurrent table={table} />
      <TablePaginationButtons table={table} />
    </div>
  );
}

export function TablePaginationPageRange<TData>({
  className,
  table,
}: JSX.IntrinsicElements["div"] & { table: Table<TData> }) {
  const { pageIndex, pageSize, from, to, total } = useTablePagination(table);
  return (
    <div
      className={cn(
        "h-[48px] min-w-fit !my-auto flex items-center text-sm text-muted-foreground",
        className,
      )}
    >
      {`${from} - ${to > total ? total : to} of ${total} rows`}
    </div>
  );
}

export function TablePaginationPageSize<TData>({
  className,
  table,
}: JSX.IntrinsicElements["div"] & { table: Table<TData> }) {
  const { pageIndex, pageSize, from, to, total } = useTablePagination(table);
  return (
    <div
      className={cn(
        "h-[48px] min-w-fit !my-auto flex items-center space-x-2",
        className,
      )}
    >
      <p className="hidden md:block text-sm font-medium">Rows per page</p>
      <Select
        value={`${pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[10, 25, 50, 100].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function TablePaginationPageCurrent<TData>({
  className,
  table,
}: JSX.IntrinsicElements["div"] & { table: Table<TData> }) {
  const { pageIndex, pageSize, from, to, total } = useTablePagination(table);
  return (
    <div className={cn("h-[48px] min-w-fit !my-auto", className)}>
      <span className="text-sm font-medium">
        Page {pageIndex + 1} of {table.getPageCount()}
      </span>
    </div>
  );
}

export function TablePaginationButtons<TData>({
  className,
  table,
}: JSX.IntrinsicElements["div"] & { table: Table<TData> }) {
  const { pageIndex, pageSize, from, to, total } = useTablePagination(table);

  return (
    <div
      className={cn(
        "h-[48px] min-w-fit !my-auto flex items-center space-x-2",
        className,
      )}
    >
      <Button
        variant="outline"
        className="hidden w-8 h-8 p-0 lg:flex"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to first page</span>
        <i className="mdi-chevron-double-left w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        className="w-8 h-8 p-0"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to previous page</span>
        <i className="mdi-chevron-left w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        className="w-8 h-8 p-0"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to next page</span>
        <i className="mdi-chevron-right w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        className="hidden w-8 h-8 p-0 lg:flex"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to last page</span>
        <i className="mdi-chevron-double-right w-4 h-4" />
      </Button>
    </div>
  );
}
