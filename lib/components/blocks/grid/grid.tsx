import { flexRender } from "../../../deps/@tanstack/react-table.ts";
import { cn } from "../../utils.ts";
import {
  Table as _Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../table.tsx";
import type { Table, TableProps } from "../table/use-table.ts";

export type GridProps<
  TData = unknown,
  TValue = unknown,
> = TableProps<TData, TValue> & { table: Table<TData> };

export function Grid<TData, TValue>({ table }: GridProps<TData, TValue>) {
  return (
    <_Table>
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
    </_Table>
  );
}
