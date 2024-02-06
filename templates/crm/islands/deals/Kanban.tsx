import {
  type TableProps,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import {
  Kanban as _Kanban,
  type KanbanProps,
} from "netzo/components/blocks/kanban/kanban.tsx";
import { type Deal, I18N } from "@/resources/deals.ts";

// NOTE: define columns in island (route to island function serialization unsupported)
export const getColumns = (_props: TableProps): TableProps["columns"] => [];

export function Kanban<TData, TValue>(props: KanbanProps<TData, TValue>) {
  const columns = getColumns(props);

  const table = useTable<TData, TValue>({ ...props, columns });

  return <_Kanban {...props} columns={columns} table={table} />;
}
