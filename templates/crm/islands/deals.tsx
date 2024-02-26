import {
  Kanban as _Kanban,
  type KanbanProps,
} from "netzo/components/blocks/kanban/kanban.tsx";
import {
  TablePagination,
  TableToolbar, useTable
} from "netzo/components/blocks/table/table.tsx";
import { type Deal } from "../data/deals.ts";
import { I18N } from "../data/mod.ts";
import { KanbanCard } from "./deals.kanban-card.tsx";
import { KanbanGroup } from "./deals.kanban-group.tsx";

export const GROUPS: KanbanProps<Deal, unknown>["options"]["groups"] = [
  {
    id: "lead",
    title: I18N["status.lead"],
    icon: { className: "i-mdi-circle-outline bg-lightgray-500" },
    badge: { className: "bg-lightgray-500" },
  },
  {
    id: "qualified",
    title: I18N["status.qualified"],
    icon: { className: "i-mdi-circle-slice-2 bg-orange-500" },
    badge: { className: "bg-orange-500" },
  },
  {
    id: "negotiation",
    title: I18N["status.negotiation"],
    icon: { className: "i-mdi-circle-slice-6 bg-yellow-500" },
    badge: { className: "bg-yellow-500" },
  },
  {
    id: "won",
    title: I18N["status.won"],
    icon: { className: "i-mdi-check-circle bg-green-500" },
    badge: { className: "bg-green-500" },
  },
  {
    id: "lost",
    title: I18N["status.lost"],
    icon: { className: "i-mdi-close-circle bg-red-500" },
    badge: { className: "bg-red-500" },
  },
];

export const getKanbanOptions = (
  data: Deal[],
): KanbanProps<Deal, unknown>["options"] => {
  return {
    resource: "deals",
    fieldIds: {
      id: "id",
      group: "status",
      name: "name",
      description: "description",
      image: "image",
    },
    filters: [
      {
        column: "accountId",
        title: I18N.account,
        options: [...new Set(data.map((item) => item.account).flat())].sort()
          .map(
            (
              value,
            ) => (value
              ? { label: value.name, value: value.id }
              : { label: "*no data", value: "" }),
          ),
      },
    ],
    columns: [
      {
        accessorKey: "accountId",
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
    ],
    groups: GROUPS,
  };
};

export function Kanban(props: KanbanProps<Deal, unknown>) {
  const options = getKanbanOptions(props.data);

  const table = useTable<Deal, unknown>({ ...props, options });

  return (
    <div className="space-y-4">
      <TableToolbar options={options} table={table} />
      <div>
        <_Kanban
          options={options}
          table={table}
          renderGroup={(props) => <KanbanGroup {...props} />}
          renderCard={(props) => <KanbanCard {...props} />}
        />
      </div>
      <TablePagination table={table} />
    </div>
  );
}
