import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { Badge } from "netzo/components/badge.tsx";
import { Gallery } from "netzo/components/blocks/table/table.gallery.tsx";
import {
  TableColumnCell,
  TableColumnHeader,
  TablePagination,
  type TableProps,
  TableRowActions,
  TableToolbar,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import { IconCopy } from "netzo/components/icon-copy.tsx";
import { I18N, type User } from "../../data/users.ts";
// import { emailSchema } from "../../data/utils/global.types.ts";

export const getTableOptions = (
  data: User[],
): TableProps<User, unknown>["options"] => {
  return {
    resource: "users",
    fieldIds: {
      id: "id",
      name: "name",
      image: "accountId",
    },
    search: {
      column: "name",
      placeholder: "Search by name...",
    },
    filters: [],
    columns: [
      {
        id: "actions",
        cell: (props) => <TableRowActions {...props} resource="users" />,
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
        accessorKey: "email",
        header: (props) => <TableColumnHeader {...props} title={I18N.email} />,
        cell: (props) => <TableColumnCell {...props} />,
      },
      {
        accessorKey: "roles",
        header: (props) => <TableColumnHeader {...props} title={I18N.roles} />,
        cell: ({ row }) => {
          const { roles } = row.original;
          const props = {
            admin: {
              className:
                "bg-blue-500 hover:bg-blue-600 bg-opacity-80 text-white",
            },
            edit: {
              className:
                "bg-yellow-500 hover:bg-yellow-600 bg-opacity-80 text-white",
            },
            view: {
              className:
                "bg-green-500 hover:bg-green-600 bg-opacity-80 text-white",
            },
          };
          return roles?.map((role) => (
            <Badge variant="default" {...props[role]}>
              {roles}
            </Badge>
          ));
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
    ],
  };
};

export function Table(props: TableProps<User, unknown>) {
  const options = getTableOptions(props.data);

  const table = useTable<User, unknown>({ ...props, options });

  return (
    <div className="space-y-4">
      <TableToolbar options={options} table={table} />
      <Gallery {...props} options={options} table={table} />
      <TablePagination table={table} />
    </div>
  );
}
