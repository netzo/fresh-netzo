import type { JSX } from "preact";
import { Input } from "../../input.tsx";
import { cn } from "../../utils.ts";
import { type Table } from "./table.tsx";

export type TableSearch = {
  column: string;
  placeholder?: string;
};

export function TableSearch<TData = unknown>({
  className,
  table,
}: JSX.IntrinsicElements["input"] & { table: Table<TData> }) {
  if (!table.options?.initialState?.search) {
    console.error(`Missing "search" property in table.options.initialState`);
    return null;
  }

  const { column, placeholder } = table.options.initialState
    ?.search as TableSearch;

  return (
    <Input
      placeholder={placeholder}
      value={table.getColumn(column)?.getFilterValue() as string ?? ""}
      onChange={(e) => table.getColumn(column)?.setFilterValue(e.target.value)}
      className={cn("h-8 w-[150px] lg:w-[250px]", className)}
      autocomplete="off"
    />
  );
}
