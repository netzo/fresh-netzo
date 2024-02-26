import { useSignal } from "@preact/signals";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { Badge } from "netzo/components/badge.tsx";
import {
  TableActionsReload,
  TableColumnHeader,
  TableFilters,
  TablePagination,
  TableRowActions,
  TableSearch,
  TableView,
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
import { IconCopy } from "netzo/components/icon-copy.tsx";
import { Input } from "netzo/components/input.tsx";
import { Label } from "netzo/components/label.tsx";
import type { Account } from "../data/accounts.ts";
import { I18N, toDateTime } from "../data/mod.ts";

export function Table({ data }: { data: Account[] }) {
  const table = useTable<Account>(data, {
    resource: "accounts",
    idField: "id",
    search: {
      column: "name",
      placeholder: "Search by name...",
    },
    filters: [],
    columns: [
      {
        id: "actions",
        cell: (props) => <TableRowActions {...props} resource="accounts" />,
      },
      {
        accessorKey: "name",
        header: (props) => <TableColumnHeader {...props} title={I18N.name} />,
        cell: ({ row }) => {
          const { id, name = "", image } = row.original;
          return (
            <div className="flex items-center py-1">
              <Avatar className="h-9 w-9 mr-3">
                <AvatarImage src={image} />
                <AvatarFallback>{name[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <a
                href={`/accounts/${id}`}
                className="whitespace-nowrap text-center font-medium text-primary hover:underline"
              >
                {name}
              </a>
              <IconCopy value={id} tooltip="Copy ID" />
            </div>
          );
        },
      },
      {
        accessorKey: "notes",
        header: (props) => <TableColumnHeader {...props} title={I18N.notes} />,
        cell: ({ row }) => {
          const { notes = [] } = row.original;
          return (
            <a
              href={`/accounts/${row.original.id}/notes`}
              className="hover:underline"
            >
              <Badge variant="secondary">
                <i className="mdi-note-text mr-1" />
                {notes.length} Notes
              </Badge>
            </a>
          );
        },
      },
      {
        accessorKey: "contact",
        header: (props) => (
          <TableColumnHeader
            {...props}
            title={I18N.contact}
          />
        ),
        cell: ({ row }) => {
          const { email, phone } = row.original;
          return (
            <div className="flex gap-2">
              {email && (
                <a
                  href={`mailto:${email}`}
                  title={email}
                  target="_blank"
                  className="mdi-email"
                />
              )}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  title={email}
                  target="_blank"
                  className="mdi-phone"
                />
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "links",
        header: (props) => <TableColumnHeader {...props} title={I18N.links} />,
        cell: ({ row }) => {
          const { links = {} } = row.original;
          const ICONS = {
            website: "mdi-web",
            facebook: "mdi-facebook",
            linkedin: "mdi-linkedin",
            twitter: "mdi-twitter",
            other: "mdi-link",
          } as const;
          const items = Object.entries(links)
            .filter(([name, value]) => value)
            .map(([name, value]) => ({ name, value, className: ICONS[name] }));
          return (
            <div className="flex gap-2">
              {items.map((item, index) => (
                <a
                  key={`link-${index}`}
                  href={item.value}
                  target="_blank"
                  title={`${item.name}: ${item.value}`}
                  className={item.className}
                />
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "updatedAt",
        header: (props) => (
          <TableColumnHeader {...props} title={I18N.updatedAt} />
        ),
        cell: ({ row }) => {
          const { updatedAt } = row.original;
          return <div>{toDateTime(updatedAt)}</div>;
        },
      },
    ],
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
          <AccountsFormCreate />
        </div>
      </header>
      <div className="border rounded-md">
        <TableView table={table} />
      </div>
      <TablePagination table={table} />
    </div>
  );
}

export function AccountsFormCreate() {
  const data = useSignal<Partial<Account>>({ name: "" });

  const onClickCreate = async () => {
    const response = await fetch(`/api/accounts`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data.value),
    });
    if (response.ok) {
      const data = await response.json();
      globalThis.location.href = `/accounts/${data.id}`;
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
