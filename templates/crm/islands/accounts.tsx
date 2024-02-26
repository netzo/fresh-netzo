import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { Badge } from "netzo/components/badge.tsx";
import { Grid } from "netzo/components/blocks/table/table.grid.tsx";
import {
  TableColumnHeader,
  TablePagination,
  type TableProps,
  TableRowActions,
  TableToolbar,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import { IconCopy } from "netzo/components/icon-copy.tsx";
import { type Account } from "../data/accounts.ts";
import { I18N, toDateTime } from "../data/mod.ts";

export const getTableOptions = (
  data: Account[],
): TableProps<Account, unknown>["options"] => {
  return {
    resource: "accounts",
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
  };
};

export function Table(props: { data: Account[] }) {
  const options = getTableOptions(props.data);

  const table = useTable<Account, unknown>({ ...props, options });

  return (
    <div className="space-y-4">
      <TableToolbar options={options} table={table} />
      <div className="border rounded-md">
        <Grid options={options} table={table} />
      </div>
      <TablePagination table={table} />
    </div>
  );
}
