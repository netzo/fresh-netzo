import { useSignal } from "@preact/signals";
import {
  KanbanView,
  type UseKanbanOptions,
} from "netzo/components/blocks/kanban/kanban.tsx";
import {
  TableActionsReload,
  TableFilters,
  TablePagination,
  TableSearch,
  TableViewOptions,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import { Button } from "netzo/components/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "netzo/components/dialog.tsx";
import { Input } from "netzo/components/input.tsx";
import { Label } from "netzo/components/label.tsx";
import { type Deal } from "../data/deals.ts";
import { I18N } from "../data/mod.ts";
import { KanbanCard } from "./deals.kanban-card.tsx";
import { KanbanGroup } from "./deals.kanban-group.tsx";

export const GROUPS: UseKanbanOptions<Deal>["group"]["groups"] = [
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

export function Kanban({ data }: { data: Deal[] }) {
  const table = useTable<Deal>(data, {
    resource: "deals",
    idField: "id",
    search: {
      column: "name",
      placeholder: "Search by name...",
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
    group: {
      column: "status",
      groups: GROUPS,
    },
  });

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center flex-1 space-x-2">
          <TableActionsReload table={table} />
          <TableSearch table={table} />
          <TableFilters table={table} />
        </div>

        <div className="flex items-center space-x-2">
          <TableViewOptions table={table} />
          <DealsFormCreate />
        </div>
      </header>
      <div>
        <KanbanView
          table={table}
          renderGroup={(props) => <KanbanGroup {...props} />}
          renderCard={(props) => <KanbanCard {...props} />}
        />
      </div>
      <TablePagination table={table} />
    </div>
  );
}

export function DealsFormCreate() {
  const data = useSignal<Partial<Deal>>({ name: "" });

  const onClickCreate = async () => {
    const response = await fetch(`/api/deals`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data.value),
    });
    if (response.ok) {
      const data = await response.json();
      globalThis.location.href = `/deals/${data.id}`;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="ml-2">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-left">
          <DialogTitle>Create New</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="col-span-3"
              value={data.value.name}
              onInput={(e) => data.value.name = e.target.value}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClickCreate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
