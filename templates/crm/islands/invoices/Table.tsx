import {
  Table as _Table,
  type TableProps,
} from "netzo/components/blocks/table/table.tsx";
import { renderHeader } from "netzo/components/blocks/render.tsx";
import { toDate, toDateTime } from "netzo/components/blocks/format.ts";
import { CopyId } from "netzo/components/blocks/shared/copy-id.tsx";
import { Badge } from "netzo/components/ui/badge.tsx";
import { Checkbox } from "netzo/components/ui/checkbox.tsx";
import { ALIASES, type Invoice } from "@/resources/invoices.ts";

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
    accessorKey: "id",
    header: renderHeader(ALIASES.id),
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="flex">
          <a
            href={`/invoices/${id}`}
            className="whitespace-nowrap text-center font-medium text-primary hover:underline"
          >
            {id}
          </a>
          <CopyId id={id} />
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: renderHeader(ALIASES.status),
    cell: ({ row }) => {
      const { status } = row.original;
      const colors = {
        pending: "red",
        paid: "green",
        cancelled: "gray",
      };
      const background = `bg-${colors[status]}-500`;
      return status
        ? (
          <Badge
            variant="default"
            className={`${background} hover:${background} bg-opacity-80 text-white`}
          >
            {status}
          </Badge>
        )
        : <></>;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
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

export function Table(props: Omit<TableProps<Invoice, unknown>, "columns">) {
  const columns = getColumns(props);
  return (
    <_Table
      data={props.data}
      options={props.options}
      columns={columns}
    />
  );
}
