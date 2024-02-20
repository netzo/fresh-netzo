import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { Gallery } from "netzo/components/blocks/table/table.gallery.tsx";
import {
  TableColumnHeader,
  TablePagination,
  TableRowActions,
  TableToolbar,
  useTable,
  type TableProps,
} from "netzo/components/blocks/table/table.tsx";
import { IconCopy } from "netzo/components/icon-copy.tsx";
import { I18N, type User } from "../../data/users.ts";

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
      const { id, name = "", image } = row.original;
      const [first = "", last = ""] = name.split(" ");
      const initials = `${first[0]}${last[0]}`?.toUpperCase();
      return (
        <div className="flex items-center py-1">
          <Avatar className="h-9 w-9 mr-3">
            <AvatarImage src={image} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          {name}
          <IconCopy value={id} tooltip="Copy ID" />
        </div>
      );
    },
  },
  {
    accessorKey: "emails",
    header: (props) => <TableColumnHeader {...props} title={I18N.emails} />,
    cell: ({ row }) => {
      const { id, name = "", image } = row.original;
      const [first = "", last = ""] = name.split(" ");
      const initials = `${first[0]}${last[0]}`?.toUpperCase();
      return (
        <div className="flex items-center">
            <i className="mdi-office-building" />
            <span className="ml-2">{emails[0].}</span>

        </div>
      );
    },
  },
];

export function Table(props: Omit<TableProps<User, unknown>, "columns">) {
  const columns = getColumns(props);

  const table = useTable<TData, TValue>({ ...props, columns });

  return (
    <div className="space-y-4">
      <TableToolbar {...props} table={table} />
      <Gallery {...props} columns={columns} table={table} />
      <TablePagination table={table} />
    </div>
  );
}
