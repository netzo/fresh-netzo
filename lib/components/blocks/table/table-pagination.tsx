import { Button } from "../../button.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../select.tsx";
import { cn } from "../../utils.ts";
import { useTablePagination } from "./hooks/use-table-pagination.ts";
import type { Table } from "./table.tsx";

type Props<TData> = { table: Table<TData>; locale?: "en" | "es" };

export function TablePagination<TData>({
  table,
  locale = "es",
}: JSX.IntrinsicElements["button"] & Props<TData>) {
  const { pageIndex, pageSize, from, to, total } = useTablePagination(table);
  return (
    <div className="flex flex-wrap w-full gap-y-2 gap-x-8 items-center justify-end">
      {
        /* <TablePaginationPageRange
        table={table}
        locale={locale}
        className="flex-1"
      /> */
      }
      <TablePaginationPageSize table={table} locale={locale} />
      <TablePaginationPageCurrent table={table} locale={locale} />
      <TablePaginationButtons table={table} locale={locale} />
    </div>
  );
}

export function TablePaginationPageRange<TData>({
  className,
  table,
  locale = "es",
}: JSX.IntrinsicElements["div"] & Props<TData>) {
  const { pageIndex, pageSize, from, to, total } = useTablePagination(table);
  const text = locale === "en"
    ? `${from} - ${to > total ? total : to} of ${total} rows`
    : `${from} - ${to > total ? total : to} de ${total} filas`;
  return (
    <div
      className={cn(
        "h-[48px] min-w-fit !my-auto flex items-center text-sm text-muted-foreground",
        className,
      )}
    >
      {text}
    </div>
  );
}

export function TablePaginationPageSize<TData>({
  className,
  table,
  locale = "es",
}: JSX.IntrinsicElements["div"] & Props<TData>) {
  const { pageIndex, pageSize, from, to, total } = useTablePagination(table);
  const text = locale === "en" ? "Rows per page" : "Filas por página";
  return (
    <div
      className={cn(
        "h-[48px] min-w-fit !my-auto flex items-center space-x-2",
        className,
      )}
    >
      <p className="hidden md:block text-sm font-medium">{text}</p>
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
          {[10, 25, 50, 100, 250, 500, 1000].map((pageSize) => (
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
  locale = "es",
}: JSX.IntrinsicElements["div"] & Props<TData>) {
  const { pageIndex, pageSize, from, to, total } = useTablePagination(table);
  const text = locale === "en"
    ? `Page ${pageIndex + 1} of ${table.getPageCount()}`
    : `Página ${pageIndex + 1} de ${table.getPageCount()}`;
  return (
    <div className={cn("contents h-[48px] min-w-fit !my-auto", className)}>
      <span className="text-sm font-medium">
        {text}
      </span>
    </div>
  );
}

export function TablePaginationButtons<TData>({
  className,
  table,
  locale = "es",
}: JSX.IntrinsicElements["div"] & Props<TData>) {
  const { pageIndex, pageSize, from, to, total } = useTablePagination(table);
  const textFirst = locale === "en" ? "Go to first page" : "Ir a la primera página";
  const textPrevious = locale === "en" ? "Go to previous page" : "Ir a la página anterior";
  const textNext = locale === "en" ? "Go to next page" : "Ir a la página siguiente";
  const textLast = locale === "en" ? "Go to last page" : "Ir a la última página";
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
        <span className="sr-only">{textFirst}</span>
        <i className="i-mdi-chevron-double-left w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        className="w-8 h-8 p-0"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">{textPrevious}e</span>
        <i className="i-mdi-chevron-left w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        className="w-8 h-8 p-0"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">{textNext}</span>
        <i className="i-mdi-chevron-right w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        className="hidden w-8 h-8 p-0 lg:flex"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">{textLast}</span>
        <i className="i-mdi-chevron-double-right w-4 h-4" />
      </Button>
    </div>
  );
}
