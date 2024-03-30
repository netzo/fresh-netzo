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
  if (!table.options?.meta?.search) {
    console.error(`Missing "search" property in table.options.meta`);
    return null;
  }

  const {
    column,
    placeholder,
  } = table.options.meta?.search as TableSearch;
  const value = table.getColumn(column)?.getFilterValue() as string ?? "";
  const onChange = (e: JSX.ChangeEvent) => {
    table.getColumn(column)?.setFilterValue(e.target.value);
  };
  return (
    <Input
      placeholder={placeholder}
      value={value ?? ""}
      onChange={onChange}
      className={cn("h-8 w-[150px] lg:w-[250px]", className)}
      autocomplete="off"
    />
  );
}
