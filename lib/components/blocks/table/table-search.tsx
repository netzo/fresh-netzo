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
  const search = table.options.meta?.search as TableSearch;
  const value = table.getColumn(
    search.column,
  )?.getFilterValue() as string ?? "";
  const onChange = (e: JSX.ChangeEvent) => {
    table.getColumn(search.column)?.setFilterValue(e.target.value);
  };
  return (
    <Input
      placeholder={search.placeholder}
      value={value}
      onChange={onChange}
      className={cn("h-8 w-[150px] lg:w-[250px]", className)}
      autocomplete="off"
    />
  );
}
