import { useState } from "../../../deps/preact/hooks.ts";
import { _, Grid as _Grid } from "../../../deps/gridjs-react.ts";

export type GridProps<TData = unknown, TValue = unknown> = {
  data: TData[];
  options: {
    resource: string;
  };
  columns: ColumnDef<TData, TValue>[];
};

export function Grid<TData, TValue>({
  data,
  columns,
  options,
}: GridProps<TData, TValue>) {
  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://unpkg.com/gridjs/dist/theme/mermaid.min.css"
      />
      <_Grid
        data={data}
        columns={columns}
        {...options}
      />
    </>
  );
}
