import {
  TablePagination,
  type TableProps,
  TableToolbar,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import {
  Kanban as _Kanban,
  type KanbanProps,
} from "netzo/components/blocks/kanban/kanban.tsx";
import { type Deal, I18N } from "@/services/deals.ts";

// NOTE: define columns in island (route to island function serialization unsupported)
export const getColumns = (_props: TableProps): TableProps["columns"] => [
  {
    id: "backlog",
    title: "Backlog",
    icon: { className: "i-mdi-circle-outline bg-lightgray-500" },
    badge: { className: "bg-lightgray-500" },
  },
  {
    id: "todo",
    title: "Todo",
    icon: { className: "i-mdi-circle-slice-2 bg-orange-500" },
    badge: { className: "bg-orange-500" },
  },
  {
    id: "in-progress",
    title: "In Progress",
    icon: { className: "i-mdi-circle-slice-6 bg-yellow-500" },
    badge: { className: "bg-yellow-500" },
  },
  {
    id: "done",
    title: "Done",
    icon: { className: "i-mdi-check-circle bg-green-500" },
    badge: { className: "bg-green-500" },
  },
  {
    id: "cancelled",
    title: "Cancelled",
    icon: { className: "i-mdi-close-circle bg-gray-500" },
    badge: { className: "bg-gray-500" },
  },
];

export function Kanban<TData, TValue>(props: KanbanProps<TData, TValue>) {
  const columns = getColumns(props);

  const table = useTable<TData, TValue>({ ...props, columns });

  return (
    <div className="flex flex-col h-full space-y-4">
      <TableToolbar {...props} table={table} />
      <div className="flex-1">
        <_Kanban {...props} />
      </div>
      <TablePagination table={table} />
    </div>
  );
}
