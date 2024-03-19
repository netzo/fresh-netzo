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
import { type Contact, getContact } from "../data/contacts.ts";
import { I18N, toDateTime } from "../data/mod.ts";

export function PageContacts(props: { contacts: Contact[] }) {
  const table = useTable<Contact>(props.contacts, {
    endpoint: "/api/contacts",
    idField: "id",
    search: {
      column: "name",
      placeholder: "Search by name...",
    },
    sorting: [
      { id: "updatedAt", desc: false },
      { id: "name", desc: true },
    ],
    filters: [
      {
        column: "accountId",
        title: I18N.account,
        options: [...new Set(props.contacts.map((item) => item.account).flat())]
          .sort()
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
        id: "actions",
        cell: (props) => (
          <TableRowActions {...props} endpoint="/api/contacts" />
        ),
      },
      {
        accessorKey: "name",
        header: (props) => <TableColumnHeader {...props} title={I18N.name} />,
        cell: ({ row }) => {
          const { id, name = "", image } = row.original;
          const [first = "", last = ""] = name.split(" ");
          const initials = `${first[0]}${last[0]}`?.toUpperCase();
          return (
            <div className="flex items-center py-1">
              <Avatar className="h-9 w-9 mr-3">
                <AvatarImage src={image} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <a
                href={`/contacts/${id}`}
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
        accessorKey: "accountId",
        header: (props) => (
          <TableColumnHeader
            {...props}
            title={I18N.account}
          />
        ),
        cell: ({ row }) => {
          const { id, name = "", image } = row.original.account ?? {};
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
        filterFn: (row, id, value) =>
          value.includes(row.getValue(id)),
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
              href={`/contacts/${row.original.id}/activities`}
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
        accessorKey: "phones",
        header: (props) => <TableColumnHeader {...props} title={I18N.phones} />,
        cell: ({ row }) => {
          const { phones = {} } = row.original;
          const ICONS = {
            work: "mdi-phone",
            mobile: "mdi-cellphone",
            personal: "mdi-cellphone-lock",
          } as const;
          const items = Object.entries(phones)
            .filter(([name, value]) => value)
            .map(([name, value]) => ({ name, value, className: ICONS[name] }));
          return (
            <div className="flex gap-1">
              {items.map((item, index) => (
                <a
                  key={`phone-${index}`}
                  href={`tel:${item.value}`}
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
        accessorKey: "emails",
        header: (props) => <TableColumnHeader {...props} title={I18N.emails} />,
        cell: ({ row }) => {
          const { emails = {} } = row.original;
          const ICONS = {
            work: "mdi-email",
            personal: "mdi-email-lock",
          } as const;
          const items = Object.entries(emails)
            .filter(([name, value]) => value)
            .map(([name, value]) => ({ name, value, className: ICONS[name] }));
          return (
            <div className="flex gap-1">
              {items.map((item, index) => (
                <a
                  key={`mail-${index}`}
                  href={`mailto:${item.value}`}
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
    const name = globalThis.prompt("Enter contact name");
    if (name) {
      const response = await fetch(`/api/contacts`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(getContact({ name })),
      });
      if (response.ok) {
        const data = await response.json();
        globalThis.location.href = `/contacts/${data.id}`;
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
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
