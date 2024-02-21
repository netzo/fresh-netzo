import { flexRender } from "../../../deps/@tanstack/react-table.ts";
import { Card, CardContent, CardHeader } from "../../card.tsx";
import type { Table, TableProps } from "./use-table.ts";

export type GalleryProps<
  TData = unknown,
  TValue = unknown,
> = TableProps<TData, TValue> & { table: Table<TData> };

export function Gallery<TData, TValue>(
  { options, table }: GalleryProps<TData, TValue>,
) {
  const Header = ({ id, row }: { id: string; row: Table<TData>["row"] }) => {
    const cell = row?.getVisibleCells().find((cell) => cell.column.id === id);
    if (!cell) return null;
    // return simple header instead of header component via flexRender
    const header = cell.column?.id ?? cell.column?.accessorKey;
    return header ? `${header}:` : null;
  };
  const Cell = ({ id, row }: { id: string; row: Table<TData>["row"] }) => {
    const cell = row?.getVisibleCells().find((cell) => cell.column.id === id);
    if (!cell) return null;
    return flexRender(
      cell.column.columnDef.cell,
      cell.getContext(),
    );
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {table.getRowModel().rows.map((row) => (
        <Card key={row.id}>
          {row?.original?.[options.fieldIds?.image] && (
            <img
              className="w-full h-32 object-cover"
              src={row?.original?.[options.fieldIds?.image]}
              alt=""
            />
          )}
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex-1 truncate">
              <Cell id="name" row={row} />
            </div>
            <Cell id="actions" row={row} />
          </CardHeader>
          <CardContent>
            {row.getVisibleCells().filter((cell) =>
              !["actions", "name"].includes(cell.column.id)
            ).map((cell) => (
              <div key={cell.column.id}>
                <div className="mb-1 flex justify-between text-sm">
                  <Header className="text-muted-secondary !truncate" id={cell.column.id} row={row} />
                  <Cell className="flex-1 text-right !truncate" id={cell.column.id} row={row} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
