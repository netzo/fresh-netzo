import {
  Kanban as _Kanban,
  type KanbanProps,
} from "netzo/components/blocks/kanban/kanban.tsx";
import {
  useTable,
  type TableProps,
} from "netzo/components/blocks/table/table.tsx";

// NOTE: define columns in island (route to island function serialization unsupported)
export const getColumns = (_props: TableProps): TableProps["columns"] => [];

export function Kanban<TData, TValue>(props: KanbanProps<TData, TValue>) {
  const columns = getColumns(props);

  const table = useTable<TData, TValue>({ ...props, columns });

  return <_Kanban {...props} columns={columns} table={table} />;
}
