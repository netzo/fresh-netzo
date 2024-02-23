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
    filters: [
      {
        column: "type",
        title: I18N.type,
        options: [...new Set(data.map((item) => item.type))].sort().map((
          value,
        ) => (value ? { label: value, value } : { label: "*no data", value })),
      },
    ],
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
          const [first = "", last = ""] = name.split(" ");
          const initials = `${first[0]}${last[0]}`?.toUpperCase();
          return (
            <div className="flex items-center py-1">
              <Avatar className="h-9 w-9 mr-3">
                <AvatarImage src={image} />
                <AvatarFallback>{initials}</AvatarFallback>
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
        accessorKey: "type",
        header: (props) => <TableColumnHeader {...props} title={I18N.type} />,
        cell: ({ row }) => {
          const { type } = row.original;
          const colors = {
            prospect: "yellow",
            customer: "green",
            supplier: "red",
            partner: "blue",
            other: "gray",
          };
          const background = `bg-${colors[type]}-500`;
          return type
            ? (
              <Badge
                variant="default"
                className={`${background} hover:${background} bg-opacity-80 text-white`}
              >
                {type}
              </Badge>
            )
            : <></>;
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
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
