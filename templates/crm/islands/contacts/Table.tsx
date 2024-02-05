import {
  TableColumnCell,
  TableColumnHeader,
  TablePagination,
  type TableProps,
  TableRowActions,
  TableToolbar,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import { Grid } from "netzo/components/blocks/grid/grid.tsx";
import { toDateTime } from "netzo/components/blocks/format.ts";
import { IconCopy } from "netzo/components/icon-copy.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { type Contact, I18N } from "@/services/contacts.ts";

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
    header: (props) => <TableColumnHeader {...props} title={I18N.accountId} />,
    cell: ({ row }) => {
      const { accountId, account } = row.original;
      return (
        <a
          href={`/accounts/${accountId}`}
          className="whitespace-nowrap text-center font-medium text-primary hover:underline"
        >
          {account?.name ? account.name : accountId}
        </a>
      );
    },
  },
  {
    accessorKey: "emails",
    header: (props) => <TableColumnHeader {...props} title={I18N.emails} />,
    cell: (props) => <TableColumnCell {...props} />,
  },
  {
    accessorKey: "phones",
    header: (props) => <TableColumnHeader {...props} title={I18N.phones} />,
    cell: (props) => <TableColumnCell {...props} />,
  },
  {
    accessorKey: "createdAt",
    header: (props) => <TableColumnHeader {...props} title={I18N.createdAt} />,
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return <div>{toDateTime(createdAt)}</div>;
    },
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

export function Table(props: Omit<TableProps<Contact, unknown>, "columns">) {
  const columns = getColumns(props);

  const table = useTable<TData, TValue>({ ...props, columns });

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
