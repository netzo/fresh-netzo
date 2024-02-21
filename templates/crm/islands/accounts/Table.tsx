import { Avatar, AvatarFallback } from "netzo/components/avatar.tsx";
import { Badge } from "netzo/components/badge.tsx";
import { toDateTime } from "netzo/components/blocks/format.ts";
import { Grid } from "netzo/components/blocks/table/table.grid.tsx";
import {
  TableColumnHeader,
  TablePagination,
  TableRowActions,
  TableToolbar,
  useTable,
  type TableProps,
} from "netzo/components/blocks/table/table.tsx";
import { IconCopy } from "netzo/components/icon-copy.tsx";
import { I18N, accountSchema, type Account } from "../../data/accounts.ts";

// NOTE: define columns in island (route to island function serialization unsupported)
export const getColumns = ({ options }: TableProps): TableProps["columns"] => [
  {
    id: "actions",
    cell: (props) => <TableRowActions {...props} options={options} />,
  },
  {
    accessorKey: "name",
    header: (props) => <TableColumnHeader {...props} title={I18N.name} />,
    cell: ({ row }) => {
      const { id, name = "" /*avatar*/ } = row.original;
      const [first = "", last = ""] = name.split(" ");
      const initials = `${first[0]}${last[0]}`?.toUpperCase();
      return (
        <div className="flex items-center py-1">
          <Avatar className="h-9 w-9 mr-3">
            {/* <AvatarImage src={avatar} /> */}
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
    header: (props) => <TableColumnHeader {...props} title={I18N.updatedAt} />,
    cell: ({ row }) => {
      const { updatedAt } = row.original;
      return <div>{toDateTime(updatedAt)}</div>;
    },
  },
];

export function Table(props: Omit<TableProps<Account, unknown>, "columns">) {
  const columns = getColumns(props);

  const table = useTable<TData, TValue>({
    ...props,
    columns,
    meta: {
      forms: {
        create: accountSchema,
        update: accountSchema,
      },
    },
  });

  return (
    <div className="space-y-4">
      <TableToolbar {...props} table={table} />
      <div className="border rounded-md">
        <Grid {...props} columns={columns} table={table} />
      </div>
      <TablePagination table={table} />
    </div>
  );
}
