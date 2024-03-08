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
import { IconCopy } from "netzo/components/icon-copy.tsx";
import type { Account } from "../data/accounts.ts";
import { getAccount } from "../data/accounts.ts";
import { I18N, toDateTime } from "../data/mod.ts";

export function PageAccounts(props: { accounts: Account[] }) {
  const table = useTable<Account>(props.accounts, {
    resource: "accounts",
    idField: "id",
    search: {
      column: "name",
      placeholder: "Search by name...",
    },
    sorting: [
      { id: "updatedAt", desc: false },
      { id: "name", desc: true },
    ],
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
        accessorKey: "activities",
        header: (props) => (
          <TableColumnHeader {...props} title={I18N.activities} />
        ),
        cell: ({ row }) => {
          const { activities = [] } = row.original;
          return (
            <a
              href={`/accounts/${row.original.id}/activities`}
              className="hover:underline"
            >
              <Badge variant="secondary" className="w-max">
                <i className="mdi-radiobox-marked mr-1" />
                {activities.length} Activities
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

  const onClickCreate = async () => {
    const name = globalThis.prompt("Enter account name");
    if (name) {
      const response = await fetch(`/api/accounts`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(getAccount({ name })),
      });
      if (response.ok) {
        const data = await response.json();
        globalThis.location.href = `/accounts/${data.id}`;
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center flex-1 space-x-2">
          <TableActionsReload table={table} />
          <TableSearch table={table} />
          <TableFilters table={table} />
        </div>
        <div className="flex items-center space-x-2">
          <TableViewOptions table={table} />
          <Button
            variant="default"
            className="ml-2"
            onClick={onClickCreate}
          >
            Create
          </Button>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto">
        <div className="border rounded-md mx-4">
          <TableView table={table} />
        </div>
      </div>
      <footer className="flex items-center justify-between p-4">
        <TablePagination table={table} />
      </footer>
    </div>
  );
}
