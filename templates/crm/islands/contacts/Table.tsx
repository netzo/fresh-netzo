import {
  Table as _Table,
  type TableProps,
} from "netzo/components/blocks/table/table.tsx";
import { renderHeader } from "netzo/components/blocks/render.tsx";
import { toDateTime } from "netzo/components/blocks/format.ts";
import { CopyId } from "netzo/components/blocks/shared/copy-id.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/ui/avatar.tsx";
import { Checkbox } from "netzo/components/ui/checkbox.tsx";
import { ALIASES, type Contact } from "@/resources/contacts.ts";

// NOTE: columns must be defined in island due to client-only function serialization
export const getColumns = (_props: TableProps): TableProps["columns"] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="flex mx-auto my-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: renderHeader(ALIASES.name),
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
          <CopyId id={id} />
        </div>
      );
    },
  },
  {
    accessorKey: "accountId",
    header: renderHeader(ALIASES.accountId),
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
    header: renderHeader(ALIASES.emails),
    cell: renderCell(),
  },
  {
    accessorKey: "phones",
    header: renderHeader(ALIASES.phones),
    cell: renderCell(),
  },
  {
    accessorKey: "createdAt",
    header: renderHeader(ALIASES.createdAt),
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return <div>{toDateTime(createdAt)}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: renderHeader(ALIASES.updatedAt),
    cell: ({ row }) => {
      const { updatedAt } = row.original;
      return <div>{toDateTime(updatedAt)}</div>;
    },
  },
];

export function Table(props: Omit<TableProps<Contact, unknown>, "columns">) {
  const columns = getColumns(props);
  return (
    <_Table
      data={props.data}
      options={props.options}
      columns={columns}
    />
  );
}
