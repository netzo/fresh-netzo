import {
  TablePagination,
  type TableProps,
  TableToolbar,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import { Grid } from "netzo/components/blocks/grid/grid.tsx";
import { renderHeader } from "netzo/components/blocks/render.tsx";
import { toDate, toDateTime } from "netzo/components/blocks/format.ts";
import { IconCopy } from "netzo/components/icon-copy.tsx";
import { Badge } from "netzo/components/badge.tsx";
import { Checkbox } from "netzo/components/checkbox.tsx";
import { ALIASES, type Invoice } from "@/services/invoices.ts";

// NOTE: define columns in island (route to island function serialization unsupported)
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
        <div className="flex items-center">
          <a
            href={`/invoices/${id}`}
            className="whitespace-nowrap text-center font-medium text-primary hover:underline"
          >
            {id}
          </a>
          <IconCopy value={id} tooltip="Copy ID" />
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

export function Table(
  { data, options }: Omit<TableProps<Invoice, unknown>, "columns">,
) {
  const columns = getColumns({ data, options });

  const table = useTable<TData, TValue>({ data, options, columns });

  return (
    <div className="space-y-4">
      <TableToolbar options={options} table={table} />
      <div className="border rounded-md">
        <Grid
          data={data}
          options={options}
          columns={columns}
          table={table}
        />
      </div>
      <TablePagination table={table} />
    </div>
  );
}
