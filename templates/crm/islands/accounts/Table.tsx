import {
  TablePagination,
  type TableProps,
  TableToolbar,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import { Grid } from "netzo/components/blocks/grid/grid.tsx";
import { renderHeader } from "netzo/components/blocks/render.tsx";
import { toDateTime } from "netzo/components/blocks/format.ts";
import { IconCopy } from "netzo/components/icon-copy.tsx";
import { Badge } from "netzo/components/badge.tsx";
import { Checkbox } from "netzo/components/checkbox.tsx";
import { type Account, accountSchema, ALIASES } from "@/services/accounts.ts";

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
    accessorKey: "name",
    header: renderHeader(ALIASES.name),
    cell: ({ row }) => {
      const { id, name } = row.original;
      return (
        <div className="flex items-center">
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
    header: renderHeader(ALIASES.type),
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
    accessorKey: "createdAt",
    header: renderHeader(ALIASES.createdAt),
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return <div>{toDateTime(createdAt)}</div>;
      // return <input type="date" bind:value={createdAt} />;
    },
  },
  {
    accessorKey: "updatedAt",
    header: renderHeader(ALIASES.updatedAt),
    cell: ({ row }) => {
      const { updatedAt } = row.original;
      return <div>{toDateTime(updatedAt)}</div>;
      // return <input type="date" bind:value={updatedAt} />;
    },
  },
];

export function Table(
  { data, options }: Omit<TableProps<Account, unknown>, "columns">,
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
